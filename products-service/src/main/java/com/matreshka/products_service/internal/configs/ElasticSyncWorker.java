package com.matreshka.products_service.internal.configs;

import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IAdvertEntityMapper;
import com.matreshka.products_service.internal.repo.IAdvertRepo;
import com.matreshka.products_service.internal.repo.IAdvertSearchRepo;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class ElasticSyncWorker {

    private final IAdvertRepo repository;
    private final IAdvertSearchRepo advertSearchRepo;
    private final IAdvertEntityMapper mapper;
    private final EntityManager entityManager;

    @Scheduled(fixedDelay = 1000)
    @Transactional
    public void sync() {
        try {
            List<AdvertEntity> entities = repository.findRecordsToSync(100);

            if (entities.isEmpty()) return;

            List<String> ids = entities.stream()
                    .map(AdvertEntity::getId)
                    .toList();

            var documents = entities.stream()
                    .map(mapper::toDocument)
                    .toList();

            advertSearchRepo.saveAll(documents);

            repository.markAsSynced(ids);

            entityManager.clear();

        } catch (Exception e) {
            log.error("[ElasticSyncWorker sync] Failed to sync batch: {}", e.getMessage());
            throw e;
        }
    }
}
