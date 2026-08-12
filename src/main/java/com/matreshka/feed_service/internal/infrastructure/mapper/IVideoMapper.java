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

    @Mapping(target = "isFavorite", source = "isFavorite")
    @Mapping(target = "author", source = "videoEntity.user")
    @Mapping(target = "comments", expression = "java(mapComments(videoEntity.getComments()))")
    @Mapping(target = "views", expression = "java(videoEntity.getViews() != null ? (long) videoEntity.getViews().size() : 0L)")
    @Mapping(target = "title", source = "videoEntity.title")
    @Mapping(target = "advertId", source = "videoEntity.advertId")
    VideoDetailResponseDTO toDetailResponseDTO(VideoEntity videoEntity, boolean isFavorite);

    default List<CommentResponseDTO> mapComments(List<CommentEntity> comments) {
        if (comments == null) {
            return List.of();
        }
        ICommentMapper commentMapper = Mappers.getMapper(ICommentMapper.class);
        return comments.stream()
                .map(commentMapper::toResponseDTO)
                .toList();
    }

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "viewsCount", ignore = true)
    @Mapping(target = "views", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "isNew", ignore = true)
    @Mapping(target = "advertId", expression = "java(event.advertId() != null && !event.advertId().isBlank() ? java.util.UUID.fromString(event.advertId()) : null)")
    VideoEntity toEntity(MediaEvent event);

    List<VideoShortResponseDTO> toShortResponseDTO(List<VideoEntity> videoEntities);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "likes", source = "likes")
    @Mapping(target = "commentsCount", expression = "java(videoEntity.getComments() != null ? (long) videoEntity.getComments().size() : 0L)")
    VideoShortResponseDTO toShortResponseDTO(VideoEntity videoEntity);
}