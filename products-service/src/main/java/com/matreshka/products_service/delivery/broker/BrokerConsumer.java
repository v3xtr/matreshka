package com.matreshka.products_service.delivery.broker;

import com.matreshka.products_service.application.port.IUserService;
import com.matreshka.products_service.application.port.IMediaService;
import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IUserService userService;
    private final IMediaService videoService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser() {
        return userService::processUser;
    }

    @Bean
    public Consumer<MediaEvent> consumeMediaCreated() {
        return videoService::processMedia;
    }
}
