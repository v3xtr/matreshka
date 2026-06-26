package com.matreshka.auth_service.delivery.http.dto;

public record RegisterUserResponseDTO(
    String id,
    String name,
    String phone
) {
}
