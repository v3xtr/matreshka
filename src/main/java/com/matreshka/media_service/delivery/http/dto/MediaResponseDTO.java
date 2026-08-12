package com.matreshka.media_service.delivery.http.dto;

public record MediaResponseDTO(
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