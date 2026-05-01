package com.matreshka.notification_service.delivery.dto;

import java.util.UUID;

public record NotificationResponseDTO(
        UUID id,
        String message,
        String createdAt
) {}