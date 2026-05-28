package com.matreshka.media_service.delivery.broker;

import com.matreshka.media_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishMedia(@NotNull List<MediaResponseDTO> events) {
        for(MediaResponseDTO event : events){
            streamBridge.send("media-created-out-0", event);
        }
    }
}
