package com.matreshka.notification_service.application;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.http.dto.NotificationRequestDTO;
import com.matreshka.notification_service.delivery.http.dto.NotificationResponseDTO;
import com.matreshka.notification_service.internal.components.FirebaseUtils;
import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.PushTokenEntity;
import com.matreshka.notification_service.internal.models.NotificationEvent;
import com.matreshka.notification_service.internal.mapper.NotificationMapper;
import com.matreshka.notification_service.internal.repo.INotificationRepo;
import com.matreshka.notification_service.internal.repo.IPushTokenRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService implements INotificationService {

    private final INotificationRepo notificationRepo;
    private final IPushTokenRepo pushTokenRepo;
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
        Optional<String> tokenOpt = pushTokenRepo.findByUserId(userId).map(PushTokenEntity::getToken);
        if (tokenOpt.isEmpty()) {
            log.info("Нет push-токена для userId {}, пропускаю отправку", userId);
            return;
        }
        String token = tokenOpt.get();

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
                    log.error("Ошибка отправки пуша: {}", ex.getMessage());
                    return null;
                });
    }

    @Override
    @Transactional
    public void saveToken(String userId, NotificationRequestDTO notificationRequestDTO){
        PushTokenEntity entity = pushTokenRepo.findByUserId(userId)
                .orElseGet(() -> PushTokenEntity.builder().userId(userId).build());
        entity.setToken(notificationRequestDTO.token());
        pushTokenRepo.save(entity);
    }

    @Override
    @Transactional
    public void saveNotification(NotificationEvent event) {
        NotificationEntity entity = notificationMapper.toEntity(event);
        entity.setTitle("Новое сообщение от " + event.senderId());
        notificationRepo.save(entity);
    }
}
