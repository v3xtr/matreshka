package com.matreshka.authservice.internal.components;

import com.matreshka.authservice.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.authservice.delivery.broker.port.UserEventPublisher;
import com.matreshka.authservice.internal.infrastructure.persistence.OutboxEventEntity;
import com.matreshka.authservice.internal.repo.OutboxEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class OutboxWorker {

    private final OutboxEventRepository outboxEventRepository;
    private final UserEventPublisher brokerProducer;
    private final ObjectMapper objectMapper;

    @Scheduled(fixedRate = 3000)
    public void processOutboxEntities() {
        List<OutboxEventEntity> entities = outboxEventRepository.findPending();

        if (entities.isEmpty()) return;

        log.info("Обработка {} событий из Outbox", entities.size());

        for (OutboxEventEntity entity : entities) {
            try {
                UserRegisteredEvent eventDto = objectMapper.readValue(entity.getPayload(), UserRegisteredEvent.class);

                log.info("Отправка события {}", eventDto);

                brokerProducer.produce(eventDto);

                entity.setProcessed(true);
                outboxEventRepository.save(entity);

                log.info("Событие {} успешно отправлено", entity.getId());
            } catch (Exception e) {
                log.error("Критическая ошибка при отправке события {}: {}", entity.getId(), e.getMessage());
            }
        }
    }
}