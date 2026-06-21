package com.matreshka.feed_service.delivery.http.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record VideoShortResponseDTO(
        UUID id,
        long likes,
        long commentsCount,
        String cdnUrl,
        String description,
        LocalDateTime createdAt
) {}