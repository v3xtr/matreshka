package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IVideoRepo extends JpaRepository<VideoEntity, UUID> {

    @Query("SELECT v.likes FROM VideoEntity v WHERE v.id = :videoId")
    long getLikes(@Param("videoId") UUID videoId);

    @Modifying
    @Query("SELECT v.comments, v.comments FROM VideoEntity v WHERE v.id = :videoId")
    VideoEntity getVideoWithLikesAndComments(@Param("videoId") UUID videoId);

}