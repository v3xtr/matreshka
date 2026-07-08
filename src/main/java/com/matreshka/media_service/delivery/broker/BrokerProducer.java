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
        events.forEach(event -> {
            log.info("Sending event: {}", event);

            if(event.extension().equals("mp4")){
                publishToTopic("video-success-out-0", event);
            }else{
                publishToTopic("video-process-out-0", event);
            }
        });
    }

    private void publishToTopic(String topic, MediaResponseDTO event) {
        boolean sent = streamBridge.send(topic, event);

        if(!sent){
            log.error("[MediaService BrokerProducer publishMedia]: error sending");
            throw new RuntimeException("Внутряняя ошибка сервера");
        }
    }
}
