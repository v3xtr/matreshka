package com.matreshka.products_service.delivery.http.dto;

import java.util.UUID;

public record ServiceResponseDTO(
        UUID id,
        String text
) {
}