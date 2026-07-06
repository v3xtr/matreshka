package com.matreshka.chat_service.delivery.broker;

import com.matreshka.chat_service.application.port.IUserService;
import com.matreshka.chat_service.delivery.broker.dto.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IUserService userService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser(){
        return userService::processUser;
    }
}
