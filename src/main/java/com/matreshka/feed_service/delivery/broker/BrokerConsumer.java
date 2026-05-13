package com.matreshka.feed_service.delivery.broker;

import com.matreshka.feed_service.application.port.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerConsumer {

    private final IUserService userService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser(){
        return userService::processUser;
    }
}
