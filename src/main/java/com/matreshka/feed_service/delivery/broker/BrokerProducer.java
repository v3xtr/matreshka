package com.matreshka.feed_service.delivery.broker;

import com.matreshka.feed_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.feed_service.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishMediaDeleted(MediaDeleteEvent dto){
        streamBridge.send("mediaDeleted-out-0", dto);
    }
}
