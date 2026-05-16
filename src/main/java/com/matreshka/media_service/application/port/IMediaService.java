package com.matreshka.media_service.application.port;

import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;

import java.util.List;
import java.util.UUID;

public interface IMediaService {
    PresignedUrlResponseDTO generatePresignedUrl(String userId, PresignedUrlRequestDTO dto);
    List<MediaResponseDTO> create(List<MediaCreateRequestDTO> dtos, String userId);
    List<MediaResponseDTO> getUserVideos(String userId, String type);
    void updateMediaThumbnail(String id, String url);
    void delete(String s3Key);
}
