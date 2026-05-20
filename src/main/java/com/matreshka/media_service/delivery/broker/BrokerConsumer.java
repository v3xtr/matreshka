package com.matreshka.media_service.delivery.broker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.application.port.IUserService;
import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.broker.dto.MediaEvent;
import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.charset.StandardCharsets;
import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class BrokerConsumer {

    private final IUserService userService;
    private final IMediaService mediaService;

    @Bean
    public Consumer<String> consumeUser() {
        return userService::processUser;
    }

    @Bean
    public Consumer<byte[]> consumeUserCreated(ObjectMapper objectMapper) {
        return bytes -> {
            try {
                String raw = new String(bytes, StandardCharsets.UTF_8);
                log.info("Raw message: {}", raw);
                UserRegisteredEvent event = objectMapper.readValue(bytes, UserRegisteredEvent.class);
                userService.processUser(event.id());
            } catch (Exception e) {
                log.error("Failed to deserialize UserRegisteredEvent: {}", e.getMessage(), e);
            }
        };
    }

    @Bean
    public Consumer<MediaEvent> consumeMedia() {
        return event -> {
            mediaService.updateMediaThumbnail(
                    event.mediaId(),
                    event.thumbnailUrl()
            );
            log.info("Media thumbnail updated: {}", event);
        };
    }

    @Bean
    public Consumer<MediaDeleteEvent> consumeDeleteMedia() {
        return event -> mediaService.delete(event.id());
    }
}
