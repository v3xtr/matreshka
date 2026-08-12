package com.matreshka.media_service.delivery.broker;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.application.port.IUserService;
import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class BrokerConsumer {

    private final IUserService userService;
    private final IMediaService mediaService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser() {
        return event -> {
            log.info("[Kafka Consumer] Received user update event: {}", event);
            userService.processUser(event.id());
        };
    }

    @Bean
    public Consumer<UserRegisteredEvent> consumeUserCreated() {
        return event -> {
            log.info("[Kafka Consumer] Received user created event from auth-service: {}", event);
            userService.processUser(event.id());
        };
    }

    @Bean
    public Consumer<MediaDeleteEvent> consumeMediaDelete() {
        return event -> {
            log.info("[Kafka Consumer] Received media delete event: {}", event);
            mediaService.deleteVideo(event);
        };
    }
}