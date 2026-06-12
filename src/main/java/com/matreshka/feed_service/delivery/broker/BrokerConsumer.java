package com.matreshka.feed_service.delivery.broker;

import com.matreshka.feed_service.application.port.IUserService;
import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.broker.dto.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IUserService userService;
    private final IVideoService videoService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser(){
        return userService::processUser;
    }

    @Bean
    public Consumer<MediaEvent> consumeMediaCreated(){
        return videoService::processMedia;
    }
}
