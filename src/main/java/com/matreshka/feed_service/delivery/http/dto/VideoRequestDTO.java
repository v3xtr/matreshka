package com.matreshka.feed_service.delivery.http.dto;

public record VideoRequestDTO(
        String id,
        String videoId,
        String ip
) {
}
