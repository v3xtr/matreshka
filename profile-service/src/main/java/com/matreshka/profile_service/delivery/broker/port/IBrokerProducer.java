package com.matreshka.profile_service.delivery.broker.port;

import com.matreshka.profile_service.delivery.broker.dto.UserUpdatedEvent;

public interface IBrokerProducer {
    void publishUpdatedUser(UserUpdatedEvent userUpdatedEvent);
}
