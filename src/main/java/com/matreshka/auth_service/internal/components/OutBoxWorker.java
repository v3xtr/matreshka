package com.matreshka.auth_service.internal.components;

import com.matreshka.auth_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.auth_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.auth_service.internal.infrastructure.persistence.OutBoxEntity;
import com.matreshka.auth_service.internal.repo.IOutBoxRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class OutBoxWorker {

    private final IOutBoxRepo outBoxRepo;
    private final IBrokerProducer brokerProducer;
    private final ObjectMapper objectMapper;

    @Scheduled(fixedRate = 3000)
    public void processOutboxentitys() {
        List<OutBoxEntity> entities = outBoxRepo.findPending();

        if (entities.isEmpty()) return;

        log.info("Обработка {} событий из Outbox", entities.size());

        for (OutBoxEntity entity : entities) {
            try {
                UserRegisteredEvent eventDto = objectMapper.readValue(entity.getPayload(), UserRegisteredEvent.class);

                brokerProducer.produce(eventDto);

                entity.setProcessed(true);
                outBoxRepo.save(entity);

                log.info("Событие {} успешно отправлено", entity.getId());
            } catch (Exception e) {
                log.error("Критическая ошибка при отправке события {}: {}", entity.getId(), e.getMessage());
            }
        }
    }
}