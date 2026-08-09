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

    @EntityGraph(attributePaths = {"comments", "likes"})
    @Query("SELECT v FROM VideoEntity v WHERE v.id = :videoId")
    VideoEntity getVideoWithLikesAndComments(@Param("videoId") UUID videoId);

    @Query(nativeQuery = true, value =
            "SELECT * FROM videos ORDER BY MD5(CAST(id AS TEXT) || CAST(:seed AS TEXT)) LIMIT :size OFFSET :offset")
    List<VideoEntity> findRandomWithSeed(
            @Param("seed") double seed,
            @Param("size") int size,
            @Param("offset") int offset);

    @Modifying
    @Query("UPDATE VideoEntity v SET v.likes = v.likes + :delta WHERE v.id = :videoId")
    void incrementLikes(@Param("videoId") UUID videoId, @Param("delta") long delta);

    @Query("SELECT COUNT(v) > 0 FROM ViewEntity v WHERE v.video.id = :videoId AND v.user.id = :userId")
    boolean hasViewed(@Param("videoId") UUID videoId, @Param("userId") String userId);

    @Modifying
    @Query("UPDATE VideoEntity v SET v.viewsCount = v.viewsCount + :delta WHERE v.id = :videoId")
    void incrementViews(@Param("videoId") UUID videoId, @Param("delta") long delta);

    @Modifying
    @Query("DELETE FROM VideoEntity v WHERE v.cdnUrl = :cdnUrl")
    void deleteBys3Key(@Param("cdnUrl") String cdnUrl);
}