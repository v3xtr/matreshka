package com.matreshka.feed_service.delivery.broker.dto;

public record MediaEvent(
        String id,
        String fileName,
        String description,
        String extension,
        String s3Key,
        String cdnUrl,
        String thumbnailUrl,
        String type,
        String mimeType,
        String userId,
        String title,
        String advertId
) {
}
