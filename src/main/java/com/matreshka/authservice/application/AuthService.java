package com.matreshka.authservice.application;

import com.matreshka.authservice.application.model.AuthenticationResult;
import com.matreshka.authservice.application.port.AuthUseCase;
import com.matreshka.authservice.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.authservice.delivery.http.dto.*;
import com.matreshka.authservice.internal.components.IdGenerator;
import com.matreshka.authservice.internal.components.JwtBuilder;
import com.matreshka.authservice.internal.configs.PasswordConfig;
import com.matreshka.authservice.internal.exceptions.ConflictException;
import com.matreshka.authservice.internal.exceptions.UnauthorizedException;
import com.matreshka.authservice.internal.exceptions.UserNotFoundException;
import com.matreshka.authservice.internal.infrastructure.mapper.UserMapper;
import com.matreshka.authservice.internal.infrastructure.persistence.UserEntity;
import com.matreshka.authservice.internal.repo.RedisAuthCacheRepository;
import com.matreshka.authservice.internal.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService implements AuthUseCase {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordConfig passwordEncoder;
    private final JwtBuilder jwtService;
    private final IdGenerator idGenerator;
    private final RedisAuthCacheRepository authCacheRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    @Override
    public AuthenticationResult<RegisterUserResponse> register(RegisterUserRequest registerUserRequestDTO) {
        log.info("[AUTH-SERVICE] Регистрация пользователя с email: '{}'", registerUserRequestDTO.email());

        userRepository.findByEmail(registerUserRequestDTO.email()).ifPresent(user -> {
            throw new ConflictException("Пользователь уже существует");
        });

        UserEntity userEntity = userMapper.toUserEntity(registerUserRequestDTO);

        String encodedPassword = passwordEncoder.passwordEncoder().encode(registerUserRequestDTO.password());

        UserEntity savedUser = saveToDB(userEntity, encodedPassword);

        UserRegisteredEvent brokerEvent = new UserRegisteredEvent(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getName(),
                savedUser.getPhone()
        );

        eventPublisher.publishEvent(brokerEvent);

        Map<String, String> tokens = jwtService.generateTokens(savedUser.getId());
        saveRefreshToken(savedUser.getId(), tokens.get("refreshToken"));

        RegisterUserResponse responseDto = userMapper.toRegisterUserResponse(savedUser);

        return new AuthenticationResult<>(responseDto, tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    @Transactional
    @Override
    public AuthenticationResult<LoginUserResponse> login(LoginUserRequest loginUserRequestDTO) {
        String inputLogin = loginUserRequestDTO.login().trim();
        log.info("[AUTH-SERVICE] Попытка входа для логина: '{}'", inputLogin);

        UserEntity userEntity;

        if (inputLogin.startsWith("+7") || inputLogin.matches("\\d+")) {
            userEntity = userRepository.findByPhone(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Неверные Данные")
            );
        } else {
            userEntity = userRepository.findByEmail(inputLogin).orElseThrow(
                    () -> new UserNotFoundException("Неверные Данные")
            );
        }

        if (!passwordEncoder.passwordEncoder().matches(loginUserRequestDTO.password(), new String(userEntity.getPassword()))) {
            throw new IllegalArgumentException("Неверные данные");
        }

        Map<String, String> tokens = jwtService.generateTokens(userEntity.getId());
        saveRefreshToken(userEntity.getId(), tokens.get("refreshToken"));

        LoginUserResponse responseDto = userMapper.toLoginUserResponse(userEntity);

        return new AuthenticationResult<>(responseDto, tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    @Override
    public String refreshAccessToken(String accessToken) {
        try {
            String userId = jwtService.extractUserIdIgnoringExpiration(accessToken);

            if (userId == null) {
                throw new UnauthorizedException("Пожалуйста авторизуйтесь");
            }

            String storedRefreshToken = authCacheRepository.findRefreshToken(userId);

            if (storedRefreshToken == null) {
                throw new UnauthorizedException("Пожалуйста авторизуйтесь");
            }

            return jwtService.refreshAccessTokenByRefresh(storedRefreshToken);

        } catch (UnauthorizedException e) {
            throw e;
        } catch (Exception e) {
            throw new UnauthorizedException("Ошибка при обновлении токена");
        }
    }

    @Override
    public void saveRefreshToken(String userId, String refreshToken) {
        authCacheRepository.saveRefreshToken(userId, refreshToken);
    }

    private UserEntity saveToDB(UserEntity userEntity, String encodedPassword) {
        userEntity.setPassword(encodedPassword.toCharArray());

        userEntity.setId(idGenerator.generateId());

        return userRepository.save(userEntity);
    }
}