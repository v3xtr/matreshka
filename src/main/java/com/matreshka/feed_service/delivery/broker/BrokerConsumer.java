package com.matreshka.feed_service.delivery.broker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matreshka.feed_service.application.port.IUserService;
import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.feed_service.delivery.broker.dto.UserUpdatedEvent;
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
    private final IVideoService videoService;
    private final ObjectMapper objectMapper;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser(){
        return userRegisteredEvent -> {
            log.info("Received user event: {}", userRegisteredEvent);
            userService.processUser(userRegisteredEvent);
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
    public Consumer<UserUpdatedEvent> consumeUpdatedUser(){
        return userUpdatedEvent -> {
            log.info("Received updated user event: {}", userUpdatedEvent);
            userService.processUpdatedUser(userUpdatedEvent);
        };
    }

    @Bean
    public Consumer<String> mediaDelete(){
        return base64Payload -> {
            try{
                String cleanPayload = base64Payload.replace("\"", "");

                byte[] decodedBytes = Base64.getDecoder().decode(cleanPayload);

                MediaDeleteEvent mediaDeleteEvent = objectMapper.readValue(decodedBytes, MediaDeleteEvent.class);
                log.info("Successfully parsed MediaDeleteEvent: {}", mediaDeleteEvent);


                videoService.deleteVideo(mediaDeleteEvent);

            }catch (Exception e){
                log.error("Failed to decode and parse MediaDeleteEvent", e);
                throw new RuntimeException(e);
            }
        };
    }
}