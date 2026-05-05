package com.matreshka.media_service.delivery.broker.dto;

import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;

import java.time.LocalDateTime;
import java.util.UUID;

public record MediaEvent(
        UUID eventId,
        UUID mediaId,
        UUID userId,
        MediaEntity type,
        String payloadUrl,
        String thumbnailUrl,
        String mimeType,
        LocalDateTime timestamp
) {}