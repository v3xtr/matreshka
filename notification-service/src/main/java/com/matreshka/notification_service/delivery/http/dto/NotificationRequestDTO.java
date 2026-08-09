package com.matreshka.notification_service.delivery.http.dto;

import jakarta.validation.constraints.NotBlank;

public record NotificationRequestDTO(
        @NotBlank
        String userId,

        @NotBlank
        String token
) {
}
