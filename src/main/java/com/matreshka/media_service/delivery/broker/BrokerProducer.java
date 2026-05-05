package com.matreshka.media_service.delivery.broker;

import com.matreshka.media_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrokerProducer implements IBrokerProducer {
    private final StreamBridge streamBridge;

    @Value("${media.producer.queue}")
    private String mediaQueue;

    public void publishMedia(List<MediaResponseDTO> event){
        streamBridge.send(mediaQueue, event);
    }
}
