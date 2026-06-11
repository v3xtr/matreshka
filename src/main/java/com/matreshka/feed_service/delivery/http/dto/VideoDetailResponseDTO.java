package com.matreshka.feed_service.delivery.http.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record VideoDetailResponseDTO(
        UUID id,
        String mediaId,
        String cdnUrl,
        String mimeType,
        String description,
        LocalDateTime createdAt,
        long likes,
        long commentsCount,
        long views,
        UserShortInfoDTO author
) {}