package com.matreshka.auth_service.internal.repo;

import com.matreshka.auth_service.internal.infrastructure.persistence.OutBoxEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOutBoxRepo extends JpaRepository<OutBoxEntity, Long> {

    @Query(value = "SELECT * FROM outbox_events WHERE is_processed = false LIMIT 10 FOR UPDATE SKIP LOCKED", nativeQuery = true)
    List<OutBoxEntity> findPending();
}
