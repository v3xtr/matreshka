package com.matreshla.vk_oauth.delivery.broker.port;

import com.matreshla.vk_oauth.delivery.broker.dto.UserRegisteredEvent;

public interface IBrokerProducer {
    void produce(UserRegisteredEvent userRegisteredEvent);
}
