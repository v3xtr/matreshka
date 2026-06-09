package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.http.dto.*;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IVideoMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "author", source = "user")
    @Mapping(target = "commentsCount", expression = "java(videoEntity.getComments() != null ? (long) videoEntity.getComments().size() : 0L)")
    VideoDetailResponseDTO toDetailResponseDTO(VideoEntity videoEntity);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "username", ignore = true)
    UserShortInfoDTO toAuthorDTO(UserEntity userEntity);

    @Mapping(target = "views", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "mimeType", ignore = true)
    @Mapping(target = "mediaId", ignore = true)
    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "cdnUrl", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "comments", ignore = true)
    VideoEntity toEntity(VideoRequestDTO videoRequestDTO);

    @Mapping(target = "views", ignore = true)
    @Mapping(target = "ip",  ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "mediaId", ignore = true)
    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "comments", ignore = true)
    VideoEntity toEntity(MediaEvent mediaEvent);

    List<VideoShortResponseDTO> toShortResponseDTO(List<VideoEntity> videoEntities);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "likes", source = "likes")
    VideoShortResponseDTO toShortResponseDTO(VideoEntity videoEntity);
}