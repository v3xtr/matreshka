package com.matreshka.feed_service.delivery.http.dto;

import java.util.UUID;

public record DeleteVideoRequestDTO(
        UUID id,
        String s3Key
) {
}
