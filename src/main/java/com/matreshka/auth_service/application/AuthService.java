package com.matreshka.auth_service.application;

import com.matreshka.auth_service.application.port.IAuthService;
import com.matreshka.auth_service.delivery.http.dto.*;
import com.matreshka.auth_service.internal.components.IdGenerator;
import com.matreshka.auth_service.internal.components.JWTBuilder;
import com.matreshka.auth_service.internal.configs.PasswordHashing;
import com.matreshka.auth_service.internal.exceptions.ConflictException;
import com.matreshka.auth_service.internal.exceptions.UnAuthorizedException;
import com.matreshka.auth_service.internal.exceptions.UserNotFoundException;
import com.matreshka.auth_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.auth_service.internal.repo.CacheRepo;
import com.matreshka.auth_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    private final CacheRepo cacheRepo;

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
        log.info("[AUTH-SERVICE] Попытка входа для логина: '{}'", inputLogin);

        UserEntity userEntity;

        if (inputLogin.startsWith("+7") || inputLogin.matches("\\d+")) {
            userEntity = userRepo.findUserByPhone(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Неверные Данные")
            );
        } else {
            userEntity = userRepo.findUserByEmail(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Неверные Данные")
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
    public String refreshToken(String accessToken) {
        try {
            String userId = jwtBuilder.extractUserIdIgnoringExpiration(accessToken);

            if (userId == null) {
                throw new UnAuthorizedException("Пожалуйста авторизуйтесь");
            }

            String storedRefreshToken = cacheRepo.getToken(userId);

            if (storedRefreshToken == null) {
                throw new UnAuthorizedException("Пожалуйста авторизуйтесь");
            }

            return jwtBuilder.refreshAccessTokenByRefresh(storedRefreshToken);

        } catch (UnAuthorizedException e) {
            throw e;
        } catch (Exception e) {
            throw new UnAuthorizedException("Ошибка при обновлении токена");
        }
    }

    @Override
    public void saveToken(String userId, String refreshToken) {
        cacheRepo.saveToken(userId, refreshToken);
    }

    private UserEntity saveToDB(UserEntity userEntity, String encodedPassword) {
        userEntity.setPassword(encodedPassword.toCharArray());

        userEntity.setId(idGenerator.generateId());

        return userRepo.save(userEntity);
    }
}