package com.matreshka.notification_service.internal.models;

import java.time.LocalDateTime;

public record NotificationEvent(
        String id,
        String senderId,
        String receiverId,
        String roomId,
        String message,
        boolean isRead,
        LocalDateTime createdAt
) {
}

