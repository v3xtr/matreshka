package com.matreshka.feed_service.delivery.http.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record VideoDetailResponseDTO(
        UUID id,
        String cdnUrl,
        String mimeType,
        String title,
        String description,
        LocalDateTime createdAt,
        long likes,
        List<CommentResponseDTO> comments,
        long views,
        UserShortInfoDTO author,
        LocalDateTime publishedAt,
        Boolean isFavorite,
        UUID advertId
) {}