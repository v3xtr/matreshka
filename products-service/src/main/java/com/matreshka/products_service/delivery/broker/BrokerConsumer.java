package com.matreshka.products_service.delivery.broker;

import com.matreshka.products_service.application.port.IUserService;
import com.matreshka.products_service.application.port.IVideoService;
import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.delivery.broker.dto.VideoEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IUserService userService;
    private final IVideoService videoService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser() {
        return userService::processUser;
    }

    @Bean
    public Consumer<VideoEvent> consumeVideo() {
        return videoService::processVideo;
    }
}
