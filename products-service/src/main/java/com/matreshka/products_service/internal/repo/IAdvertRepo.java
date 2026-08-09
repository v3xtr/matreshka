package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import jakarta.persistence.LockModeType;
import lombok.NonNull;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IAdvertRepo extends JpaRepository<AdvertEntity, UUID> {

    @EntityGraph(attributePaths = {"video", "pictures"})
    Optional<AdvertEntity> findById(@NonNull  UUID id);

    List<AdvertEntity> findAdvertsByUserId(String userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM AdvertEntity a WHERE a.isInElastic = false ORDER BY a.createdAt ASC")
    List<AdvertEntity> findRecordsToSync(@Param("limit") int limit);

    @Modifying
    @Query(value = "UPDATE adverts SET is_in_elastic = true WHERE id IN :ids", nativeQuery = true)
    void markAsSynced(@Param("ids") List<UUID> ids);

}
