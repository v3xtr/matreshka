package com.matreshka.auth_service.application;

import com.matreshka.auth_service.application.port.IAuthService;
import com.matreshka.auth_service.delivery.http.dto.*;
import com.matreshka.auth_service.internal.components.IdGenerator;
import com.matreshka.auth_service.internal.components.JWTBuilder;
import com.matreshka.auth_service.internal.configs.PasswordHashing;
import com.matreshka.auth_service.internal.exceptions.BadRequestException;
import com.matreshka.auth_service.internal.exceptions.ConflictException;
import com.matreshka.auth_service.internal.exceptions.UserNotFoundException;
import com.matreshka.auth_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.auth_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final IUserRepo userRepo;
    private final IUserMapper userMapper;
    private final PasswordHashing passwordHashing;
    private final JWTBuilder jwtBuilder;
    private final StringRedisTemplate redisTemplate;
    private final IdGenerator idGenerator;

    @Transactional
    @Override
    public AuthResult<RegisterUserResponseDTO> register(RegisterUserRequestDTO registerUserRequestDTO) {
        System.out.println("[AUTH-SERVICE] Регистрация пользователя с email: '" + registerUserRequestDTO.email() + "'");

        userRepo.findUserByEmail(registerUserRequestDTO.email()).ifPresent(user -> {
            throw new ConflictException("Пользователь уже существует");
        });

        UserEntity userEntity = userMapper.toUserEntity(registerUserRequestDTO);

        String rawPassword = registerUserRequestDTO.password();
        String encodedPassword = passwordHashing.passwordEncoder().encode(rawPassword);
        userEntity.setPassword(encodedPassword.toCharArray());

        userEntity.setId(idGenerator.generateId());

        UserEntity savedUser = userRepo.save(userEntity);

        Map<String, String> tokens = jwtBuilder.generateTokens(savedUser.getId());
        saveToken(savedUser.getId(), tokens.get("refreshToken"));

        RegisterUserResponseDTO responseDto = userMapper.toRegisterUserResponseDTO(savedUser);

        return new AuthResult<>(responseDto, tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    @Transactional
    @Override
    public AuthResult<LoginUserResponseDTO> login(LoginUserRequestDTO loginUserRequestDTO) {
        String inputLogin = loginUserRequestDTO.login().trim();
        System.out.println("[AUTH-SERVICE] Попытка входа для логина: '" + inputLogin + "'");

        UserEntity userEntity;

        if (inputLogin.startsWith("+7") || inputLogin.matches("\\d+")) {
            System.out.println("[AUTH-SERVICE] Определен тип входа: Телефон");
            userEntity = userRepo.findUserByPhone(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Пользователь с таким телефоном не найден")
            );
        } else {
            System.out.println("[AUTH-SERVICE] Определен тип входа: Email");
            userEntity = userRepo.findUserByEmail(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Пользователь с таким Email не найден")
            );
        }

        if (!passwordHashing.passwordEncoder().matches(loginUserRequestDTO.password(), new String(userEntity.getPassword()))) {
            throw new BadRequestException("Неверные данные");
        }

        Map<String, String> tokens = jwtBuilder.generateTokens(userEntity.getId());
        saveToken(userEntity.getId(), tokens.get("refreshToken"));

        LoginUserResponseDTO responseDto = userMapper.toLoginUserResponseDTO(userEntity);

        return new AuthResult<>(responseDto, tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    @Override
    public String refreshToken(String userId) {
        return jwtBuilder.generateAccessToken(userId);
    }

    private void saveToken(String userId, String refreshToken) {
        String redisKey = String.format("refreshToken:%s", userId);
        if (refreshToken == null) {
            throw new RuntimeException("refreshToken must be provided");
        }
        redisTemplate.opsForValue().set(redisKey, refreshToken, 7, TimeUnit.DAYS);
    }
}