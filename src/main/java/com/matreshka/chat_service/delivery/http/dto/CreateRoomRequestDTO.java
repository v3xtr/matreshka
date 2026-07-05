package com.matreshka.chat_service.delivery.http.dto;

public record CreateRoomRequestDTO(
        String userA,
        String userB
) {
}
