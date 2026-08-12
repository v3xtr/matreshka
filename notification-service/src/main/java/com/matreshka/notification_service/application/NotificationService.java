package com.matreshka.notification_service.application;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.http.dto.NotificationRequestDTO;
import com.matreshka.notification_service.delivery.http.dto.NotificationResponseDTO;
import com.matreshka.notification_service.internal.components.FirebaseUtils;
import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import com.matreshka.notification_service.internal.mapper.NotificationMapper;
import com.matreshka.notification_service.internal.repo.INotificationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService implements INotificationService {

    private final INotificationRepo notificationRepo;
    private final NotificationMapper notificationMapper;
    private final FirebaseUtils firebaseUtils;

    @Override
    public List<NotificationResponseDTO> getNotifications(String userId) {
        return notificationRepo.findAllByUserId(userId)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    public void sendPush(String fromUserId, String userId, String messageBody) {
        String token = notificationRepo.findTokenByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Token not found for userId: " + userId));

        Notification notification = Notification.builder()
                .setTitle("Новое сообщение от " + fromUserId)
                .setBody(messageBody)
                .build();

        Message message = Message.builder()
                .setToken(token)
                .setNotification(notification)
                .putData("senderId", fromUserId)
                .putData("type", "CHAT_MESSAGE")
                .build();

        firebaseUtils.toCompletableFuture(FirebaseMessaging.getInstance().sendAsync(message))
                .thenAccept(id -> log.info("Push delivered to: {}", id))
                .exceptionally(ex -> {
                    System.err.println("Ошибка отправки пуша: " + ex.getMessage());
                    return null;
                });
    }

    @Override
    public void saveToken(String userId, NotificationRequestDTO notificationRequestDTO){
        NotificationEntity entity = notificationMapper.toEntity(notificationRequestDTO);
        entity.setUserId(userId);
        notificationRepo.save(entity);
    }
}
