package com.matreshka.auth_service.internal.infrastructure.mapper;

import com.matreshka.auth_service.delivery.http.dto.LoginUserResponseDTO;
import com.matreshka.auth_service.delivery.http.dto.RegisterUserRequestDTO;
import com.matreshka.auth_service.delivery.http.dto.RegisterUserResponseDTO;
import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IUserMapper {
    RegisterUserResponseDTO toRegisterUserResponseDTO(UserEntity userEntity);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "description", source = "description")
    LoginUserResponseDTO toLoginUserResponseDTO(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "description", ignore = true)
    UserEntity toUserEntity(RegisterUserRequestDTO registerUserRequestDTO);
}