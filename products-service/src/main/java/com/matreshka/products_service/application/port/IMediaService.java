package com.matreshka.products_service.application.port;

import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import com.matreshka.products_service.delivery.http.dto.MediaResponseDTO;

import java.util.Optional;

public interface IMediaService {
    void processMedia(MediaEvent event);
    void deleteMedia(String s3Key);
    Optional<MediaResponseDTO> getStatus(String videoId);
}
