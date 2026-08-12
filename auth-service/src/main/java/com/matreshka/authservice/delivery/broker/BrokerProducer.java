package com.matreshka.authservice.delivery.broker;

import com.matreshka.authservice.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.authservice.delivery.broker.port.UserEventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BrokerProducer implements UserEventPublisher {

    private final StreamBridge streamBridge;

    public void produce(UserRegisteredEvent userDto){

        boolean sent = streamBridge.send("outputMappingFunc-out-0", userDto);

        if(!sent){
            log.error("Failed to send event to binding: outputMappingFunc-out-0");
            throw new RuntimeException("Ошибка сервера");
        }
    }
}
