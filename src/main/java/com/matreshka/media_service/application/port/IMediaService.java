package com.matreshka.media_service.application.port;

import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;
import com.matreshka.media_service.internal.domain.MEDIA_TYPE;

import java.util.List;

public interface IMediaService {
    PresignedUrlResponseDTO generatePresignedUrl(String userId, PresignedUrlRequestDTO dto);

    List<MediaResponseDTO> create(List<MediaCreateRequestDTO> dtos, String userId);

    List<MediaResponseDTO> getUserMediaByType(String userId, MEDIA_TYPE type);

    void deleteVideo(MediaDeleteEvent dto);

    void deleteVideo(String s3Key);
}
