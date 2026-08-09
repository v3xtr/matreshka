package com.matreshka.feed_service.delivery.http.dto;

public record DeleteVideoRequestDTO(
        String id,
        String s3Key
) {
}
