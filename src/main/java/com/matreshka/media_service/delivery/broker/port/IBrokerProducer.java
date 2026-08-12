package com.matreshka.media_service.delivery.broker.port;

import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;

import java.util.List;

public interface IBrokerProducer {
    void publishMedia(List<MediaResponseDTO> events);
    void deleteMedia(MediaDeleteEvent mediaDeleteEvent);
}
