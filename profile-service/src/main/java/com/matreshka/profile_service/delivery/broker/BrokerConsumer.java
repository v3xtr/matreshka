package com.matreshka.profile_service.delivery.broker;


import com.matreshka.profile_service.application.port.IProfileService;
import com.matreshka.profile_service.delivery.broker.dto.MediaCreatedEvent;
import com.matreshka.profile_service.delivery.broker.dto.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Slf4j
@Service
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IProfileService profileService;

    @Bean
    public Consumer<UserRegisteredEvent> consumeUser(){
        return e -> {
          log.info("[BrokerConsumer consume UserRegisteredEvent]: {}", e);
          profileService.processUser(e);
        };
    }

    @Bean
    public Consumer<MediaCreatedEvent> consumeMedia(){
        return e -> {
          log.info("[BrokerConsumer consume MediaCreatedEvent]: {}", e);
          profileService.updateUserAvatar(e.avatarUrl(), e.userId());
        };
    }
    
}
