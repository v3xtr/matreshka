package com.matreshka.media_service.delivery.http.dto;

public record PresignedUrlRequestDTO(
      String fileName,
      String contentType
) {
}
