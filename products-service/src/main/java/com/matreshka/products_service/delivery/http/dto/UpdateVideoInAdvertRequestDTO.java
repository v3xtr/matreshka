package com.matreshka.products_service.delivery.http.dto;

import java.util.UUID;

public record UpdateVideoInAdvertRequestDTO(
        UUID id,
        String videoId
) {
}
