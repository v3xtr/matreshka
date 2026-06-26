package com.matreshka.auth_service.delivery.http.dto;

public record LoginUserResponseDTO(
    String id,
    String name,
    String phone,
    String description) {
}
