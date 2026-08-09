package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.infrastructure.persistence.ViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IViewRepo extends JpaRepository<ViewEntity, Long> {
}
