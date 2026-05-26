package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAdvertRepo extends JpaRepository<AdvertEntity, String> {
    @NonNull Optional<AdvertEntity> findById(@NonNull String id);
}
