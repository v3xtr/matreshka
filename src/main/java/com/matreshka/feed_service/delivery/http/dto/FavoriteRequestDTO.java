package com.matreshka.feed_service.delivery.http.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FavoriteRequestDTO(
        @NotBlank(message = "Video ID не может быть пустым")
        @NotNull(message = "videoId cannot be null")
        String videoId
) {}