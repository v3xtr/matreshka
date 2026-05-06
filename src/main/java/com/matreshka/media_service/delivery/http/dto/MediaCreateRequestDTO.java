package com.matreshka.media_service.delivery.http.dto;

import jakarta.validation.constraints.NotBlank;

public record MediaCreateRequestDTO(
        @NotBlank
        String filename,

        @NotBlank
        String s3Key,

        @NotBlank
        String url,

        @NotBlank
        String mimeType,

        @NotBlank
        String type,

        @NotBlank
        String title,

        @NotBlank
        String description
) {
}