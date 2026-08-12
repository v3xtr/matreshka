package com.matreshka.media_service.delivery.broker;

import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.internal.domain.MEDIA_TYPE;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishMedia(@NotNull List<MediaResponseDTO> events) {
        events.forEach(event -> {
            log.info("Sending event: {}", event);

            if (event.extension().equals("mp4")) {
                log.info("Sending event to videoSuccessBinding-out-0");
                publishToTopic("videoSuccessBinding-out-0", event);
            } else {
                log.info("Sending event to videoProcessBinding-out-0");
                publishToTopic("videoProcessBinding-out-0", event);
            }

            if (MEDIA_TYPE.CHAT_MEDIA.name().equals(event.type())) {
                log.info("Sending chat media to chatMediaBinding-out-0");
                publishToTopic("chatMediaBinding-out-0", event);
            }

        });
    }

    public void deleteMedia(MediaDeleteEvent mediaDeleteEvent) {
        log.info("Sending event to deleteMediaBinding-out-0");
        boolean sent = streamBridge.send("deleteMediaBinding-out-0", mediaDeleteEvent);

        if (!sent) {
            log.error("[MediaService BrokerProducer deleteMedia]: error sending to binding deleteMediaBinding-out-0");
            throw new RuntimeException("Внутренняя ошибка сервера");
        }
    }

    private void publishToTopic(String bindingName, MediaResponseDTO event) {
        boolean sent = streamBridge.send(bindingName, event);

        if (!sent) {
            log.error("[MediaService BrokerProducer publishMedia]: error sending to binding {}", bindingName);
            throw new RuntimeException("Внутренняя ошибка сервера");
        }

        log.info("Successfully sent event to binding: {}", bindingName);
    }
}