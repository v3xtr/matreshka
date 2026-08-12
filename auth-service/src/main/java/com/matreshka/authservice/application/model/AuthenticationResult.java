package com.matreshka.authservice.application.model;

public record AuthenticationResult<T>(
        T userResponseDto,
        String accessToken,
        String refreshToken
) {}