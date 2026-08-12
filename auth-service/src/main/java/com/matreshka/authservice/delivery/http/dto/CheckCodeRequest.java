package com.matreshka.authservice.delivery.http.dto;

public record CheckCodeRequest(
        String userId,
        String code
) { }