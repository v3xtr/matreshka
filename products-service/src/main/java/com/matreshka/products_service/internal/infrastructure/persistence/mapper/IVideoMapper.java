package com.matreshka.products_service.internal.infrastructure.persistence.mapper;

import com.matreshka.products_service.delivery.broker.dto.VideoEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.VideoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface IVideoMapper {
    @Mapping(target = "user.id", source = "id")
    @Mapping(target = "advert.id", source = "id")
    VideoEntity toVideoEntity(VideoEvent videoEvent);
}