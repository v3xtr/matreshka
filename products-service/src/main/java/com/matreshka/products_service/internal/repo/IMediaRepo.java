package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMediaRepo extends JpaRepository<MediaEntity, String> {
}
