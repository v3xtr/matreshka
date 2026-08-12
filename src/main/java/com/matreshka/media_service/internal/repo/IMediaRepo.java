package com.matreshka.media_service.internal.repo;

import com.matreshka.media_service.internal.domain.MEDIA_TYPE;
import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IMediaRepo extends JpaRepository<MediaEntity, UUID> {

    @Query("SELECT m FROM MediaEntity m WHERE m.type = :type AND m.user.id = :userId")
    List<MediaEntity> findAllByParams(@Param("type") MEDIA_TYPE type, @Param("userId") String userId);

    Optional<MediaEntity> findByS3Key(String s3Key);

    void deleteByS3Key(String s3Key);
}