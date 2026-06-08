package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;
import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ICommentMapper {

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "video", ignore = true)
    @Mapping(target = "id", ignore = true)
    CommentEntity toEntity(CommentRequestDTO dto);
}