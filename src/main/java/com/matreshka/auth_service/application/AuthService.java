package com.matreshka.auth_service.application;

import com.matreshka.auth_service.application.port.IAuthService;
import com.matreshka.auth_service.delivery.http.dto.*;
import com.matreshka.auth_service.internal.components.IdGenerator;
import com.matreshka.auth_service.internal.components.JWTBuilder;
import com.matreshka.auth_service.internal.configs.AuthProperties;
import com.matreshka.auth_service.internal.configs.PasswordHashing;
import com.matreshka.auth_service.internal.exceptions.ConflictException;
import com.matreshka.auth_service.internal.exceptions.UserNotFoundException;
import com.matreshka.auth_service.internal.infrastructure.mapper.IOutBoxMapper;
import com.matreshka.auth_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.auth_service.internal.infrastructure.persistence.OutBoxEntity;
import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.auth_service.internal.repo.CacheRepo;
import com.matreshka.auth_service.internal.repo.IOutBoxRepo;
import com.matreshka.auth_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService implements IAuthService {

    private final IUserRepo userRepo;
    private final IUserMapper userMapper;
    private final PasswordHashing passwordHashing;
    private final JWTBuilder jwtBuilder;
    private final IdGenerator idGenerator;
    private final IOutBoxMapper outBoxMapper;
    private final IOutBoxRepo outBoxRepo;
    private final CacheRepo cacheRepo;
    private final AuthProperties authProperties;


    @Transactional
    @Override
    public AuthResult<RegisterUserResponseDTO> register(RegisterUserRequestDTO registerUserRequestDTO) {
        log.info("[AUTH-SERVICE] Регистрация пользователя с email: '{}'", registerUserRequestDTO.email());

        userRepo.findUserByEmail(registerUserRequestDTO.email()).ifPresent(user -> {
            throw new ConflictException("Пользователь уже существует");
        });

        UserEntity userEntity = userMapper.toUserEntity(registerUserRequestDTO);

        String encodedPassword = passwordHashing.passwordEncoder().encode(registerUserRequestDTO.password());

        UserEntity savedUser = saveToDB(userEntity, encodedPassword);

        Map<String, String> tokens = jwtBuilder.generateTokens(savedUser.getId());
        saveToken(savedUser.getId(), tokens.get("refreshToken"));

        RegisterUserResponseDTO responseDto = userMapper.toRegisterUserResponseDTO(savedUser);

        return new AuthResult<>(responseDto, tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    @Transactional
    @Override
    public AuthResult<LoginUserResponseDTO> login(LoginUserRequestDTO loginUserRequestDTO) {
        String inputLogin = loginUserRequestDTO.login().trim();
        log.info("[AUTH-SERVICE] Попытка входа для логина: '" + inputLogin + "'");

        UserEntity userEntity;

        if (inputLogin.startsWith("+7") || inputLogin.matches("\\d+")) {
            log.info("[AUTH-SERVICE] Определен тип входа: Телефон");
            userEntity = userRepo.findUserByPhone(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Пользователь с таким телефоном не найден")
            );
        } else {
            log.info("[AUTH-SERVICE] Определен тип входа: Email");
            userEntity = userRepo.findUserByEmail(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Пользователь с таким Email не найден")
            );
        }

        if (!passwordHashing.passwordEncoder().matches(loginUserRequestDTO.password(), new String(userEntity.getPassword()))) {
            throw new IllegalArgumentException("Неверные данные");
        }

        Map<String, String> tokens = jwtBuilder.generateTokens(userEntity.getId());

        saveToken(userEntity.getId(), tokens.get("refreshToken"));

        LoginUserResponseDTO responseDto = userMapper.toLoginUserResponseDTO(userEntity);

        return new AuthResult<>(responseDto, tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    @Override
    public String refreshToken(String userId){
        return jwtBuilder.createToken(userId, authProperties.access(), 15 * 60);
    }

    @Override
    public void saveToken(String userId, String refreshToken) {
        cacheRepo.saveToken(userId, refreshToken);
    }

    private UserEntity saveToDB(UserEntity userEntity, String encodedPassword){
        userEntity.setPassword(encodedPassword.toCharArray());

        userEntity.setId(idGenerator.generateId());

        UserEntity savedUser = userRepo.save(userEntity);

        OutBoxEntity outBoxEntity = outBoxMapper.toEntity(savedUser);

        outBoxEntity.setAggregateId(userEntity.getId());

        outBoxRepo.save(outBoxEntity);

        return savedUser;
    }
}