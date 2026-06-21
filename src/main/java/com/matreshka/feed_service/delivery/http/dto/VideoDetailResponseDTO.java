package com.matreshka.feed_service.delivery.http.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record VideoDetailResponseDTO(
        UUID id,
        String mediaId,
        String cdnUrl,
        String mimeType,
        String name,
        String description,
        LocalDateTime createdAt,
        long likes,
        List<CommentResponseDTO> comments,
        long views,
        UserShortInfoDTO author
) {}