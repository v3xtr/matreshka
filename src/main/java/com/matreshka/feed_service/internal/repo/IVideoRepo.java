package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IVideoRepo extends JpaRepository<VideoEntity, UUID> {

    @Query("SELECT v.likes FROM VideoEntity v WHERE v.id = :videoId")
    long getLikes(@Param("videoId") UUID videoId);

    @Modifying
    @EntityGraph(attributePaths = {"comments", "likes"})
    @Query("SELECT v.comments, v.comments FROM VideoEntity v WHERE v.id = :videoId")
    VideoEntity getVideoWithLikesAndComments(@Param("videoId") UUID videoId);

    @Query(nativeQuery = true, value =
            "SELECT * FROM videos ORDER BY RANDOM(:seed) LIMIT :limit OFFSET :size")
    List<VideoEntity> findRandomWithSeed(
            @Param("seed") double seed,
            @Param("size") int size,
            @Param("limit") int limit);

    @Modifying
    @Query("UPDATE VideoEntity v SET v.likes = v.likes + :delta WHERE v.id = :id")
    void increment(@Param("id") UUID id, @Param("delta") long delta);
}