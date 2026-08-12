package com.matreshka.authservice.internal.repo;

import com.matreshka.authservice.internal.infrastructure.persistence.OutboxEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutboxEventRepository extends JpaRepository<OutboxEventEntity, Long> {

    @Query(value = "SELECT * FROM outbox_events WHERE is_processed = false LIMIT 10 FOR UPDATE SKIP LOCKED", nativeQuery = true)
    List<OutboxEventEntity> findPending();
}
