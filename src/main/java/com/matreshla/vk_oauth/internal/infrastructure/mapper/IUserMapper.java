package com.matreshla.vk_oauth.internal.infrastructure.mapper;

import com.matreshla.vk_oauth.delivery.broker.dto.UserRegisteredEvent;
import com.matreshla.vk_oauth.delivery.http.dto.UserResponseDTO;
import com.matreshla.vk_oauth.internal.infrastructure.model.UserModel;
import com.matreshla.vk_oauth.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IUserMapper {
    @Mapping(target = "id", source = "userId")
    @Mapping(target = "firstName", source = "firstName")
    UserEntity toEntity(UserModel userModel);

    @Mapping(target = "name", source = "firstName")
    @Mapping(target = "id", source = "userId")
    UserRegisteredEvent toEvent(UserModel userModel);
}
