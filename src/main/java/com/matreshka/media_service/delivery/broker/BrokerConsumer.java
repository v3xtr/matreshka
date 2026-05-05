package com.matreshka.media_service.delivery.broker;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.application.port.IUserService;
import com.matreshka.media_service.delivery.broker.dto.MediaEvent;
import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.media_service.delivery.broker.port.IBrokerConsumer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerConsumer implements IBrokerConsumer {
    private final IUserService userService;
    private final IMediaService mediaService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser(){
        return userService::processUser;
    }

    @Bean
    public Consumer<MediaEvent> consumeMedia(){
        return event -> {
            mediaService.updateMediaThumbnail(event.mediaId(), event.thumbnailUrl());
        };
    }
}
