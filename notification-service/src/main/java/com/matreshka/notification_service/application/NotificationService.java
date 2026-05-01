package com.matreshka.notification_service.application;

import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.dto.NotificationResponseDTO;
import com.matreshka.notification_service.internal.mapper.NotificationMapper;
import com.matreshka.notification_service.internal.models.NotificationEvent;
import com.matreshka.notification_service.internal.repo.INotificationRepo;
import com.matreshka.notification_service.internal.repo.cache.port.INotificationCacheRepo;
import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService implements INotificationService {
    private final INotificationCacheRepo notificationCacheRepo;
    private final INotificationRepo notificationRepo;
    private final NotificationMapper notificationMapper;

    @Scheduled(fixedRate = 10000)
    private void saveToDB(){
        List<NotificationEvent> notificationEvents = notificationCacheRepo.popAll();

        if(notificationEvents.isEmpty()) return;

        List<NotificationEntity> notificationEntities = notificationEvents.stream().map(notificationMapper::toEntity)
                .toList();

        notificationRepo.saveAll(notificationEntities);

        log.info("Successfully flushed {} notifications to Postgres", notificationEntities .size());
    }

    public void processNotification(NotificationEvent notificationEvent){
        try{
            notificationCacheRepo.saveToCache(notificationEvent);
        }catch (Exception e){
            log.error("[NotificationService processNotification]: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<NotificationResponseDTO> getNotifications(String userId) {
        return notificationRepo.findAllByUserId(UUID.fromString(userId))
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }
}
