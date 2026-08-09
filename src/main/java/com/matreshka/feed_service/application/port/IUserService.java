package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.feed_service.delivery.broker.dto.UserUpdatedEvent;

public interface IUserService {
    void processUser(UserRegisteredEvent event);
    void processUpdatedUser(UserUpdatedEvent event);
}
