package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.infrastructure.persistence.FavoriteVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface IFavoriteVideoRepo extends JpaRepository<FavoriteVideo, String> {
    Optional<FavoriteVideo> findByUserIdAndVideoId(String userId, UUID videoId);
    void deleteByUserIdAndVideoId(String userId, UUID videoId);
    boolean existsByUserIdAndVideoId(String userId, UUID mediaId);
}
