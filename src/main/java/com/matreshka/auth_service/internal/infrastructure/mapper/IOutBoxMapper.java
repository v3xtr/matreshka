package com.matreshka.auth_service.internal.infrastructure.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matreshka.auth_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.auth_service.internal.infrastructure.persistence.OutBoxEntity;
import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public abstract class IOutBoxMapper {

    ObjectMapper objectMapper = new ObjectMapper();

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "aggregateId", source = "id")
    @Mapping(target = "topic", constant = "user-events-topic")
    @Mapping(target = "isProcessed", constant = "false")
    @Mapping(target = "payload", source = "userEntity", qualifiedByName = "userToPayload")
    public abstract OutBoxEntity toEntity(UserEntity userEntity);

    @Named("userToPayload")
    protected String userToPayload(UserEntity user) {
        try {
            UserRegisteredEvent event = new UserRegisteredEvent(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getPhone()
            );

            return objectMapper.writeValueAsString(event);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при создании payload для Outbox", e);
        }
    }
}