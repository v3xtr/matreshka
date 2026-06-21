package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.http.dto.*;

import java.util.List;
import java.util.UUID;

public interface IVideoService {
    void addView(VideoRequestDTO videoRequestDTO);
    UserResponseDTO getUserViews(String userId);
    List<VideoShortResponseDTO> getVideosWelcome(VideoShortRequestDTO videoShortRequestDTO);
    List<UserWithVideosResponseDTO> getFavoriteVideos(String userId);
    void processMedia(MediaEvent mediaEvent);
    void markAsFavorite(String userId, UUID videoId);
    void unmarkAsFavorite(String userId, UUID videoId);
    VideoDetailResponseDTO getVideo(UUID videoId);
}
