package com.matreshka.auth_service.delivery.http.dto;

public record CheckCodeDTO(
        String userId,
        String code
) { }