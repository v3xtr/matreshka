package com.matreshka.feed_service.delivery.http.dto;

import java.util.List;

public record UserResponseDTO(
        String id,
        List<VideoDetailResponseDTO> videos
) {}