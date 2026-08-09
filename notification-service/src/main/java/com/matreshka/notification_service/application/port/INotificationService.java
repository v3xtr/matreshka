package com.matreshka.notification_service.application.port;

import com.matreshka.notification_service.delivery.http.dto.NotificationRequestDTO;
import com.matreshka.notification_service.delivery.http.dto.NotificationResponseDTO;

import java.util.List;

public interface INotificationService {
    void sendPush(String fromUserId, String userId, String messageBody);
    List<NotificationResponseDTO> getNotifications(String userId);
    void saveToken(NotificationRequestDTO notificationRequestDTO);
}
