package com.matreshka.feed_service.delivery.http.dto;

import lombok.Builder;
import java.util.List;

@Builder
public record UserResponseDTO(
        String id,
        List<VideoResponseDTO> videos
) {}