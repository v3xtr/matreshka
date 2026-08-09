package com.matreshka.products_service.delivery.http.dto;

import java.time.LocalDateTime;

public record MediaResponseDTO(
        String id,
        String cdnUrl,
        String type,
        String mimeType,
        LocalDateTime publishedAt
) {
}