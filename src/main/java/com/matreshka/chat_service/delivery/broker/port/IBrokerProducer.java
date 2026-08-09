package com.matreshka.chat_service.delivery.broker.port;

import com.matreshka.chat_service.delivery.broker.dto.NotificationEvent;

public interface IBrokerProducer {
    void publishNotification(NotificationEvent notificationEvent);
}
