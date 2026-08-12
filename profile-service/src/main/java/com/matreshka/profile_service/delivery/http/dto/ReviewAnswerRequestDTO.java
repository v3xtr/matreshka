package com.matreshka.profile_service.delivery.http.dto;

import java.util.UUID;

public record ReviewAnswerRequestDTO(
        String replyText,
        UUID productId
) {
}
