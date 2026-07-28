package com.matreshka.auth_service.internal.components;

import com.matreshka.auth_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.auth_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.auth_service.internal.infrastructure.persistence.OutBoxEntity;
import com.matreshka.auth_service.internal.repo.IOutBoxRepo;
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
public class OutBoxListener {

    private final IOutBoxRepo outBoxRepo;
    private final IBrokerProducer brokerProducer;
    private final ObjectMapper objectMapper;

    @EventListener
    @Transactional
    public void handleUserCreated(UserRegisteredEvent brokerEvent) {
        try {
            OutBoxEntity outBoxEntity = new OutBoxEntity();

            outBoxEntity.setAggregateId(brokerEvent.id());
            outBoxEntity.setTopic("user.created");
            outBoxEntity.setPayload(objectMapper.writeValueAsString(brokerEvent));
            outBoxEntity.setProcessed(false);

            OutBoxEntity savedEntity = outBoxRepo.save(outBoxEntity);

            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    CompletableFuture.runAsync(() -> {
                        try {
                            brokerProducer.produce(brokerEvent);

                            savedEntity.setProcessed(true);
                            outBoxRepo.save(savedEntity);

                            log.info("Событие для пользователя {} успешно отправлено в Kafka", brokerEvent.id());
                        } catch (Exception e) {
                            log.error("Не удалось отправить событие в Kafka: {}", e.getMessage());
                        }
                    });
                }
            });

        } catch (Exception e) {
            log.error("Ошибка при создании Outbox записи для пользователя {}: {}", brokerEvent.id(), e.getMessage());
            throw new RuntimeException(e);
        }
    }
}