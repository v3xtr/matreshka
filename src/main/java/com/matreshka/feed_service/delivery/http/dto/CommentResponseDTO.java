package com.matreshka.feed_service.delivery.http.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentResponseDTO(
        UUID id,
        String text,
        String name,
        UUID parentId,
        LocalDateTime createdAt,
        UserShortInfoDTO author
) {}