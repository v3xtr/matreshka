package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.infrastructure.persistence.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVideoRepo extends JpaRepository<VideoEntity, String> {
}
