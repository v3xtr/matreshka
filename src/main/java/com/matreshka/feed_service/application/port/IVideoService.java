package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.http.dto.UserResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoDetailResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoRequestDTO;

public interface IVideoService {
    void addView(VideoRequestDTO videoRequestDTO);
    UserResponseDTO getUserViews(String userId);
    VideoDetailResponseDTO getVideo(String videoId);
}
