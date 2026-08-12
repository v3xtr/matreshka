package com.matreshka.profile_service.delivery.http.dto;

public record RateRequestDTO(
        String targetId,
        Integer newRating
) {
}
