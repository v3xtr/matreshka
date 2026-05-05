package com.matreshka.media_service.application.port;

import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;

public interface IUserService {
    UserEntity processUser(UserRegisteredEvent userRegisteredEvent);
}
