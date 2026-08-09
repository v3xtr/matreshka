package com.matreshka.authservice.internal.components;

import com.matreshka.authservice.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.authservice.delivery.broker.port.UserEventPublisher;
import com.matreshka.authservice.internal.infrastructure.persistence.OutboxEventEntity;
import com.matreshka.authservice.internal.repo.OutboxEventRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import tools.jackson.databind.ObjectMapper;

import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
@Slf4j
public class OutboxEventListener {

    private final OutboxEventRepository outboxEventRepository;
    private final UserEventPublisher brokerProducer;
    private final ObjectMapper objectMapper;

    @EventListener
    @Transactional
    public void handleUserCreated(UserRegisteredEvent brokerEvent) {
        try {
            log.info("Начало обработки Outbox для пользователя: {}", brokerEvent.id());

            OutboxEventEntity outBoxEntity = new OutboxEventEntity();
            outBoxEntity.setAggregateId(brokerEvent.id());
            outBoxEntity.setTopic("user.created");
            outBoxEntity.setPayload(objectMapper.writeValueAsString(brokerEvent));
            outBoxEntity.setProcessed(false);

            OutboxEventEntity savedEntity = outboxEventRepository.save(outBoxEntity);
            log.info("Outbox сущность успешно сохранена в базу для id: {}", brokerEvent.id());

            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    CompletableFuture.runAsync(() -> {
                        try {
                            brokerProducer.produce(brokerEvent);

                            savedEntity.setProcessed(true);
                            outboxEventRepository.save(savedEntity);

                            log.info("Событие для пользователя {} успешно отправлено в Kafka", brokerEvent.id());
                        } catch (Exception e) {
                            log.error("КРИТИЧЕСКАЯ ОШИБКА отправки в Kafka в afterCommit: ", e);
                        }
                    });
                }
            });

        } catch (Exception e) {
            log.error("КРИТИЧЕСКАЯ ОШИБКА при создании Outbox записи для пользователя {}: ", brokerEvent.id(), e);
            throw new RuntimeException(e);
        }
    }
}