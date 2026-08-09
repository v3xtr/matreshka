package com.matreshka.chat_service.delivery.broker.dto;

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