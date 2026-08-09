package com.matreshla.vk_oauth.delivery.broker;

import com.matreshla.vk_oauth.delivery.broker.dto.UserRegisteredEvent;
import com.matreshla.vk_oauth.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void produce(UserRegisteredEvent userRegisteredEvent){
        boolean sent = streamBridge.send("outputMappingFunc-out-0", userRegisteredEvent);

        if (!sent){
            throw new RuntimeException("Failed to send message to broker");
        }
    }

}
