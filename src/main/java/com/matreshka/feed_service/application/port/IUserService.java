package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.broker.UserRegisteredEvent;

public interface IUserService {
    void processUser(UserRegisteredEvent event);
}
