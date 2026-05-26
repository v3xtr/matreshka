package com.matreshka.products_service.delivery.http.dto;

public record AdvertDeleteRequestDTO(
        String id,
        String s3Key
) {
}
