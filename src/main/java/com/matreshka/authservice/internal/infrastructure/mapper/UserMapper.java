package com.matreshka.authservice.internal.infrastructure.mapper;

import com.matreshka.authservice.delivery.http.dto.LoginUserResponse;
import com.matreshka.authservice.delivery.http.dto.RegisterUserRequest;
import com.matreshka.authservice.delivery.http.dto.RegisterUserResponse;
import com.matreshka.authservice.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    RegisterUserResponse toRegisterUserResponse(UserEntity userEntity);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "email", source = "email")
    LoginUserResponse toLoginUserResponse(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "description", ignore = true)
    UserEntity toUserEntity(RegisterUserRequest registerUserRequestDTO);
}