package com.matreshka.media_service.internal.infrastructure.persistence.mapper;

import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "media", ignore = true)
    UserEntity toEntity(UserRegisteredEvent userRegisteredEvent);
}