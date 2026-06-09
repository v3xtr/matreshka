package com.matreshka.feed_service.delivery.http.dto;

import java.util.UUID;

public record VideoDetailResponseDTO(
        UUID id,
        String mediaId,
        String cdnUrl,
        String mimeType,
        long likes,
        long commentsCount,
        long views,
        UserShortInfoDTO author
) {}