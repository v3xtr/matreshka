package com.matreshka.chat_service.delivery.http.dto;

public record RoomResponseDTO(
        String userA,
        String userB,
        String productId
) {
}
