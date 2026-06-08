package com.matreshka.feed_service.delivery.http.dto;

import java.util.List;
import java.util.UUID;

public record UserWithVideosResponseDTO (
        UUID id,
        List<String> favoriteVideos

){
}
