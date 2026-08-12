package com.matreshka.products_service.delivery.broker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matreshka.products_service.application.port.IUserService;
import com.matreshka.products_service.application.port.IMediaService;
import com.matreshka.products_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerConsumer {

    private final IUserService userService;
    private final IMediaService videoService;
    private final ObjectMapper objectMapper;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUserCreated() {
        return e -> {
            log.info("Consuming user created event: {}", e);
            userService.processUser(e);
        };
    }

    @Bean
    public Consumer<String> mediaProcessorResult() {
        return base64Payload -> {
            log.info("Successfully received base64 payload: {}", base64Payload);
            try {
                String cleanPayload = base64Payload.replace("\"", "");

                byte[] decodedBytes = Base64.getDecoder().decode(cleanPayload);

                MediaEvent mediaEvent = objectMapper.readValue(decodedBytes, MediaEvent.class);
                log.info("Successfully parsed MediaEvent: {}", mediaEvent);

                videoService.processMedia(mediaEvent);
            } catch (Exception e) {
                log.error("Failed to decode and parse MediaEvent", e);
                throw new RuntimeException(e);
            }
        };
    }

    @Bean
    public Consumer<MediaDeleteEvent> mediaDelete() {
        return dto -> {
            log.info("Received media delete event for id: {}, s3Key: {}", dto.id(), dto.s3Key());
            videoService.deleteMedia(dto.s3Key());
        };
    }
}
