package com.matreshka.notification_service.delivery.broker;

import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.broker.port.IBrokerConsumer;
import com.matreshka.notification_service.internal.models.NotificationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class BrokerConsumer implements IBrokerConsumer {
    private final INotificationService notificationService;

    @Bean
    public Consumer<NotificationEvent> consumeNotification(){
        return notificationService::processNotification;
    }
}
