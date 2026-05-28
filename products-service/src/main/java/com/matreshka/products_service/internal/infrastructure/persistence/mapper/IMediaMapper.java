package com.matreshka.products_service.internal.infrastructure.persistence.mapper;

import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface IMediaMapper {
    @Mapping(target = "user.id", source = "id")
    @Mapping(target = "advert.id", source = "id")
    MediaEntity toMediaEntity(MediaEvent mediaEvent);
}