package com.matreshka.media_service.internal.infrastructure.persistence.mapper;

import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IMediaMapper {
    @Mapping(target = "fileName", source = "filename")
    @Mapping(target = "fileExtension", source = "extension")
    @Mapping(source = "url", target = "cdnUrl")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "title", source = "title")
    MediaEntity toEntity(MediaCreateRequestDTO dto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "extension", source = "fileExtension")
    MediaResponseDTO toResponseDTO(MediaEntity entity);
}