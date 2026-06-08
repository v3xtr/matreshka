package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.http.dto.*;

import java.util.List;

public interface IVideoService {
    void addView(VideoRequestDTO videoRequestDTO);
    UserResponseDTO getUserViews(String userId);
    VideoDetailResponseDTO getVideo(String videoId);
    List<VideoShortResponseDTO> getVideosWelcome(VideoShortRequestDTO videoShortRequestDTO);
    void markAsFavorite(String userId, String videoId);
    void unmarkAsFavorite(String userId, String videoId);
    List<UserWithVideosResponseDTO> getFavoriteVideos(String id);
    void processMedia(MediaEvent mediaEvent);
}
