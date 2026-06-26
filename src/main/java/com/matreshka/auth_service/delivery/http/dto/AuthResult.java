package com.matreshka.auth_service.delivery.http.dto;

public record AuthResult<T>(
        T userResponseDto,
        String accessToken,
        String refreshToken
) {}