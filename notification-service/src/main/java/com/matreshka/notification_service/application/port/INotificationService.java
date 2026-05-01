package com.matreshka.notification_service.application.port;

import com.matreshka.notification_service.delivery.dto.NotificationResponseDTO;
import com.matreshka.notification_service.internal.models.NotificationEvent;

import java.util.List;

public interface INotificationService {
    void processNotification(NotificationEvent notificationEvent);
    List<NotificationResponseDTO> getNotifications(String userId);
}
