package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepo extends JpaRepository<UserEntity, String> {
    @Query("SELECT u FROM UserEntity u JOIN FETCH u.videos WHERE u.id = :id")
    Optional<UserEntity> findByIdWithVideos(@Param("id") String id);

    @Query("SELECT u FROM UserEntity u LEFT JOIN FETCH u.favoriteVideos WHERE u.id = :id")
    UserEntity findWithFavoritesById(@Param("id") String id);
}
