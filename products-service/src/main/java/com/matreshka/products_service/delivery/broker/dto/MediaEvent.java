package com.matreshka.products_service.delivery.broker.dto;

import java.time.LocalDateTime;

public record MediaEvent(
        String id,
        String fileName,
        String s3Key,
        String url,
        String cdnUrl,
        String thumbnailUrl,
        String type,
        String mimeType,
        String userId,
        String advertId,
        LocalDateTime publishedAt,
        LocalDateTime createdAt
) {
}
