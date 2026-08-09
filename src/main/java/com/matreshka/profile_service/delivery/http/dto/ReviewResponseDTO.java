package com.matreshka.profile_service.delivery.http.dto;

import java.util.UUID;

public record ReviewResponseDTO(
        String id,
        String authorId,
        String targetUserId,
        String authorName,
        String authorAvatarUrl,
        Integer rating,
        String comment,
        String ownerReply,
        Boolean isReplied,
        String createdAt,
        UUID productId
) {
}