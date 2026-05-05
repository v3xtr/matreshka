package com.matreshka.media_service.internal.infrastructure.persistence.mapper;

import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IMediaMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "processedAt", ignore = true)
    @Mapping(target = "thumbnailUrl", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(source = "filename", target = "fileName")
    @Mapping(source = "url", target = "cdnUrl")
    MediaEntity toEntity(MediaCreateRequestDTO dto);

    MediaResponseDTO toResponseDTO(MediaEntity entity);
}