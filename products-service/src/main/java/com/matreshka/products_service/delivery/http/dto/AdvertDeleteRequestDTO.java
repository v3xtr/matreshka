package com.matreshka.products_service.delivery.http.dto;

import java.util.UUID;

public record AdvertDeleteRequestDTO(
        UUID id,
        String s3Key
) {
}
