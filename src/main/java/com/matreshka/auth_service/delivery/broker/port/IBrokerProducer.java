package com.matreshka.auth_service.delivery.broker.port;

import com.matreshka.auth_service.delivery.broker.dto.UserRegisteredEvent;

public interface IBrokerProducer {
    void produce(UserRegisteredEvent userDto);
}
