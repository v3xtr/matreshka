package com.matreshka.products_service.delivery.broker;

import com.matreshka.products_service.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishDeleteAdvertEvent(String s3Key){
        streamBridge.send("mediaDelete-out-0", s3Key);
    }
}
