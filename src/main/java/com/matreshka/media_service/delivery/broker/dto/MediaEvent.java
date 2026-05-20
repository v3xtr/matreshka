package com.matreshka.media_service.delivery.broker.dto;

import java.time.LocalDateTime;

public record MediaEvent(
        String eventId,
        String mediaId,
        String userId,
        String type,
        String payloadUrl,
        String thumbnailUrl,
        String mimeType,
        LocalDateTime timestamp
) {
}