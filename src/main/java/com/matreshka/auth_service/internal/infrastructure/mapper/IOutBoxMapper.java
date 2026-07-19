package com.matreshka.auth_service.internal.infrastructure.mapper;

import com.matreshka.auth_service.internal.infrastructure.persistence.OutBoxEntity;
import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;

@Mapper()
public interface IOutBoxMapper {
    OutBoxEntity toEntity(UserEntity userEntity);
}
