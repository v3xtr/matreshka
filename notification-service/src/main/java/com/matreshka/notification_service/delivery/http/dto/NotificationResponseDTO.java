package com.matreshka.notification_service.delivery.http.dto;

import java.util.UUID;

public record NotificationResponseDTO(
        UUID id,
        String message,
        String createdAt
) {}