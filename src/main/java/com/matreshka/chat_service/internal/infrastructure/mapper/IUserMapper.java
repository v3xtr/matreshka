package com.matreshka.chat_service.internal.infrastructure.mapper;

import com.matreshka.chat_service.delivery.broker.dto.UserEvent;
import com.matreshka.chat_service.internal.infrastructure.persistence.MessageDocument;
import com.matreshka.chat_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IUserMapper {

    @Mapping(target = "id", source = "id")
    UserEntity toEntity(UserEvent user);

    @Mapping(target = "message", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "senderId", ignore = true)
    @Mapping(target = "roomId", ignore = true)
    @Mapping(target = "id", source = "id")
    MessageDocument toDocument(UserEvent user);
}
