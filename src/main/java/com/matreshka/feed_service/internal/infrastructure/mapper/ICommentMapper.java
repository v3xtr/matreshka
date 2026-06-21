package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;
import com.matreshka.feed_service.delivery.http.dto.CommentResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.UserShortInfoDTO;
import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ICommentMapper {

    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "text", source = "text")
    @Mapping(target = "parentId", source = "parentId")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "author", expression = "java(toAuthorDTO(commentEntity.getUser()))")
    CommentResponseDTO toResponseDTO(CommentEntity commentEntity);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", ignore = true)
    UserShortInfoDTO toAuthorDTO(UserEntity userEntity);

    List<CommentResponseDTO> toResponseDTOList(List<CommentEntity> commentEntities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "video", ignore = true)
    CommentEntity toEntity(CommentRequestDTO commentRequestDTO);
}