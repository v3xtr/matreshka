package com.matreshka.feed_service.delivery.http.dto;

import java.util.UUID;

public record CommentRequestDTO(
        String userId,
        UUID videoId,
        String text,
        UUID parentId
) {}