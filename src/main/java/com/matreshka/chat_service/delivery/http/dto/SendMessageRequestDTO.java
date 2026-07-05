package com.matreshka.chat_service.delivery.http.dto;

public record SendMessageRequestDTO(
        String message,
        String senderId
) {
}
