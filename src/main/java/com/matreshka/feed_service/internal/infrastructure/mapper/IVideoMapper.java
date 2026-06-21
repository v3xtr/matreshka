package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.http.dto.*;
import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IVideoMapper {

    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "author", source = "user")
    @Mapping(target = "comments", expression = "java(mapComments(videoEntity.getComments()))")
    VideoDetailResponseDTO toDetailResponseDTO(VideoEntity videoEntity);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    UserShortInfoDTO toAuthorDTO(UserEntity userEntity);

    default List<CommentResponseDTO> mapComments(List<CommentEntity> comments) {
        if (comments == null) {
            return List.of();
        }
        ICommentMapper commentMapper = Mappers.getMapper(ICommentMapper.class);
        return comments.stream()
                .map(commentMapper::toResponseDTO)
                .toList();
    }

    @Mapping(target = "views", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "mediaId", ignore = true)
    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isNew", ignore = true)
    VideoEntity toEntity(MediaEvent mediaEvent);

    List<VideoShortResponseDTO> toShortResponseDTO(List<VideoEntity> videoEntities);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "likes", source = "likes")
    @Mapping(target = "commentsCount", expression = "java(videoEntity.getComments() != null ? (long) videoEntity.getComments().size() : 0L)")
    VideoShortResponseDTO toShortResponseDTO(VideoEntity videoEntity);
}