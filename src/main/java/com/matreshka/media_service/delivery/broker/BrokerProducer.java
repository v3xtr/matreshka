package com.matreshka.media_service.delivery.broker;

import com.matreshka.media_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishMedia(@NotNull List<MediaResponseDTO> events) {
        for(MediaResponseDTO event : events){
            log.info("Sending event: {}", event);

            boolean sent = streamBridge.send("media-created-out-0", event);

            if(!sent){
                log.error("[MediaService BrokerProducer publishMedia]: error sending");
                throw new RuntimeException("Внутряняя ошибка сервера");
            }
        }
    }
}
