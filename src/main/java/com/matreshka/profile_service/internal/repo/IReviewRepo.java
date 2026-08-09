package com.matreshka.profile_service.internal.repo;

import com.matreshka.profile_service.internal.infrastructure.persistence.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IReviewRepo extends JpaRepository<ReviewEntity, UUID> {
    List<ReviewEntity> findAllByTargetUserId(String userId);
}
