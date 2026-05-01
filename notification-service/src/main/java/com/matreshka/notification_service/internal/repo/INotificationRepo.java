package com.matreshka.notification_service.internal.repo;

import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface INotificationRepo extends JpaRepository<NotificationEntity, UUID> {
    List<NotificationEntity> findAllByUserId(UUID userId);
}
