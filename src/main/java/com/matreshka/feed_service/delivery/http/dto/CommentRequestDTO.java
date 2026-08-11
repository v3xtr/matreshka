package com.matreshka.feed_service.delivery.http.dto;

import java.util.UUID;

public record CommentRequestDTO(
        UUID videoId,
        String text,
        UUID parentId
) {}