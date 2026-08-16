package com.matreshka.notification_service.application.port;

import com.matreshka.notification_service.delivery.http.dto.NotificationRequestDTO;
import com.matreshka.notification_service.delivery.http.dto.NotificationResponseDTO;
import com.matreshka.notification_service.internal.models.NotificationEvent;

import java.util.List;

public interface INotificationService {
    void sendPush(String fromUserId, String userId, String messageBody);
    List<NotificationResponseDTO> getNotifications(String userId);
    void saveToken(String userId, NotificationRequestDTO notificationRequestDTO);
    void saveNotification(NotificationEvent event);
}
