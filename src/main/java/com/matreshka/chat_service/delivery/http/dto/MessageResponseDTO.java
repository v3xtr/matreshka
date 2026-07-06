package com.matreshka.chat_service.delivery.http.dto;

import java.time.LocalDateTime;

public record MessageResponseDTO(
     String id,
     String senderId,
     String roomId,
     String message,
     boolean isRead,
     LocalDateTime createdAt
){}