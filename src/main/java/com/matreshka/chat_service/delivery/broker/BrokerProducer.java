package com.matreshka.chat_service.delivery.broker;

import com.matreshka.chat_service.delivery.broker.dto.NotificationEvent;
import com.matreshka.chat_service.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void publishNotification(NotificationEvent notificationEvent){
        boolean sent = streamBridge.send("chatMessages-out-0", notificationEvent);

        log.info("[BrokerProducer publishNotification]: Notification sent to broker: {}", notificationEvent);

        if(!sent){
            log.error("[BrokerProducer publishNotification]: Failed to send notification to broker: {}", notificationEvent);
            throw new RuntimeException("Failed to send notification to broker");
        }
    }
}
