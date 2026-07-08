package com.matreshka.media_service.delivery.http.dto;

import java.time.LocalDateTime;

public record MediaResponseDTO(
        String id,
        String fileName,
        String description,
        String extension,
        String s3Key,
        String url,
        String cdnUrl,
        String thumbnailUrl,
        String type,
        String mimeType,
        String userId,
        LocalDateTime publishedAt,
        LocalDateTime createdAt
) {
}