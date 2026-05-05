package com.matreshka.media_service.delivery.http.dto;

public record PresignedUrlResponseDTO(
        String url,
        String s3Key
) {
}
