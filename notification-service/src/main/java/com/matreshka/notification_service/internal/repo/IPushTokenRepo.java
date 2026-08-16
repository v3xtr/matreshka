package com.matreshka.notification_service.internal.repo;

import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.PushTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface IPushTokenRepo extends JpaRepository<PushTokenEntity, UUID> {

    Optional<PushTokenEntity> findByUserId(String userId);
}
