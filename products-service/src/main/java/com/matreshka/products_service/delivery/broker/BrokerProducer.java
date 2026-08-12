package com.matreshka.products_service.delivery.broker;

import com.matreshka.products_service.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishDeleteAdvertEvent(String s3Key) {
        boolean sent = streamBridge.send("mediaDelete-out-0", s3Key);

        if(!sent){
            log.error("Failed to send message to mediaDelete-out-0");
        }
    }
}
