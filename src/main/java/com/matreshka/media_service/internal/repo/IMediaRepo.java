package com.matreshka.media_service.internal.repo;

import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMediaRepo extends JpaRepository<MediaEntity, String> {
    List<MediaEntity> findAllByTypeAndUserId(String type, String userId);

    @Modifying
    @Query("update MediaEntity m set m.thumbnailUrl = ?2 where m.id = ?1")
    void updateThumbnailById(String id, String thumbnailUrl);
    void deleteByS3Key(String s3Key);
}
