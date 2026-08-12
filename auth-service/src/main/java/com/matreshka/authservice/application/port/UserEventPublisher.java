package com.matreshka.authservice.application.port;

import com.matreshka.authservice.delivery.broker.dto.UserRegisteredEvent;

public interface UserEventPublisher {
    void produce(UserRegisteredEvent userDto);
}
