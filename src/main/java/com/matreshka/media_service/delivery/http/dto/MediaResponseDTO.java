package com.matreshka.media_service.delivery.http.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record MediaResponseDTO(
        UUID id,
        String fileName,
        String url,
        String cdnUrl,
        String thumbnailUrl,
        String type,
        String mimeType,
        UUID userId,
        LocalDateTime publishedAt,
        LocalDateTime createdAt
) {
}
