package com.matreshka.profile_service.delivery.http.dto;

public record ReviewRequestDTO(
        String targetUserId,
        String authorId,
        Integer ratingValue,
        String comment
) {
}
