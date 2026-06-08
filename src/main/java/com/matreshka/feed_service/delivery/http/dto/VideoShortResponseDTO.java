package com.matreshka.feed_service.delivery.http.dto;

import java.util.UUID;

public record VideoShortResponseDTO(
        UUID id,
        long likes
) {}