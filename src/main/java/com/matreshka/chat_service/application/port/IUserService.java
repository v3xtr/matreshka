package com.matreshka.chat_service.application.port;

import com.matreshka.chat_service.delivery.broker.dto.UserEvent;

public interface IUserService {
    void processUser(UserEvent userEvent);
}
