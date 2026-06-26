package com.matreshka.auth_service.delivery.http.dto;

public record ErrorResponseDTO(
        String message,
        String status
) {
}
