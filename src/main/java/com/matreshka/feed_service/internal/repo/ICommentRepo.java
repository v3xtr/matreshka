package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ICommentRepo extends JpaRepository<CommentEntity, UUID> {
}
