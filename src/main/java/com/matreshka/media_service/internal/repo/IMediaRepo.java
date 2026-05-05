package com.matreshka.media_service.internal.repo;

import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;


public interface IMediaRepo extends JpaRepository<MediaEntity, UUID> {
    List<MediaEntity> findAllByTypeAndUserId(String type, UUID userId);

    @Modifying
    @Query("update MediaEntity m set m.thumbnailUrl = ?2 where m.id = ?1")
    void updateThumbnailById(UUID id, String thumbnailUrl);
    void deleteByS3Key(String s3Key);
}
