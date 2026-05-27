package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import lombok.NonNull;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAdvertRepo extends JpaRepository<AdvertEntity, String> {
    @NotNull Optional<AdvertEntity> findById(@NonNull String id);

    @Query(value = """
        SELECT * FROM adverts 
        WHERE is_in_elastic = false 
        ORDER BY created_at ASC 
        LIMIT :limit 
        FOR UPDATE SKIP LOCKED
        """, nativeQuery = true)
    List<AdvertEntity> findRecordsToSync(@Param("limit") int limit);

    @Modifying
    @Query(value = "UPDATE adverts SET is_in_elastic = true WHERE id IN :ids", nativeQuery = true)
    void markAsSynced(@Param("ids") List<String> ids);

}
