package com.matreshka.profile_service.delivery.broker;

import com.matreshka.profile_service.delivery.broker.dto.UserUpdatedEvent;
import com.matreshka.profile_service.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    @Override
    public void publishUpdatedUser(UserUpdatedEvent userUpdatedEvent){
        boolean sent = streamBridge.send("updatedUser-out-0", userUpdatedEvent);

        if(!sent){
            log.error("Failed to send updated user message");
        }
    }
}
