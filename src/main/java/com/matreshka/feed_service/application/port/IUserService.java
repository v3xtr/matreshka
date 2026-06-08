package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.broker.dto.UserRegisteredEvent;

public interface IUserService {
    void processUser(UserRegisteredEvent event);
}
