package com.matreshka.notification_service.internal.repo;

import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface INotificationRepo extends JpaRepository<NotificationEntity, UUID> {

    @Query("SELECT n.token FROM NotificationEntity n WHERE n.userId = :userId")
    Optional<String> findTokenByUserId(@Param("userId") String userId);

    List<NotificationEntity> findAllByUserId(String userId);
}
