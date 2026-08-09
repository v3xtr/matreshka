package com.matreshka.feed_service.delivery.http.dto;

public record VideoRequestDTO(
        String userId,
        String videoId
) {
}
