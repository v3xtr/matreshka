package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.http.dto.UserResponseDTO;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;

@Mapper(componentModel = "spring", uses = {IVideoRepo.class})
public interface IUserMapper {

    UserResponseDTO toResponseDTO(Optional<UserEntity> userEntity);

    @Mapping(target = "videos", ignore = true)
    UserEntity toEntity(Object userRequestDTO);
}