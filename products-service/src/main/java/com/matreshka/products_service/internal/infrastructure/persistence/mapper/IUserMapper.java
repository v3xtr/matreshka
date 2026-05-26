package com.matreshka.products_service.internal.infrastructure.persistence.mapper;

import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IUserMapper {
    @Mapping(target = "videos", ignore = true)
    UserEntity toEntity(UserRegisteredEvent user);
}