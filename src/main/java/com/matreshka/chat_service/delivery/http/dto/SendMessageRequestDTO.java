package com.matreshka.chat_service.delivery.http.dto;

public record SendMessageRequestDTO(
        String senderId,
        String message
) {
}
