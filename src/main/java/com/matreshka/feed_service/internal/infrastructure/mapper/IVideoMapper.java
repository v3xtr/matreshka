package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.http.dto.VideoDetailResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoRequestDTO;
import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IVideoMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "author", source = "userId")
    @Mapping(target = "commentsCount", expression = "java(videoEntity.getComments() != null ? (long) videoEntity.getComments().size() : 0L)")
    VideoDetailResponseDTO toDetailResponseDTO(VideoEntity videoEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "comments", ignore = true)
    VideoEntity toEntity(VideoRequestDTO videoRequestDTO);
}