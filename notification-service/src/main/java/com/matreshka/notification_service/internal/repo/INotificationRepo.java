package com.matreshka.notification_service.internal.repo;

import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface INotificationRepo extends JpaRepository<NotificationEntity, UUID> {

    @Query("SELECT * FROM notifications WHERE is_read = false")
    List<NotificationEntity> findAllByUserId(String userId);
}
