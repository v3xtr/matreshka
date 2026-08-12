package com.matreshka.products_service.application.port;

import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;

public interface IUserService {
    void processUser(UserRegisteredEvent event);
}
