package com.matreshka.authservice.delivery.http.dto;

public record ErrorResponse(
        String message,
        String status
) {
}
