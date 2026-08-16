package com.matreshka.notification_service.delivery.broker;

import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.broker.port.IBrokerConsumer;
import com.matreshka.notification_service.internal.models.NotificationEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerConsumer implements IBrokerConsumer {
    private final INotificationService notificationService;

    @Bean
    public Consumer<NotificationEvent> consumeChatMessages() {
        return event -> {
            log.info("[Notification Service consumeChatMessages]: Received notification event: {}", event);
            notificationService.saveNotification(event);
            notificationService.sendPush(event.senderId(), event.receiverId(), event.message());
        };
    }
}