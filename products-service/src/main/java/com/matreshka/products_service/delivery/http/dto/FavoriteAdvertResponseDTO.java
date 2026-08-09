package com.matreshka.products_service.delivery.http.dto;

public record FavoriteAdvertResponseDTO(
        String id,
        String title,
        String price,
        String category,
        String subCategory,
        String address,
        boolean isFavorite
){}
