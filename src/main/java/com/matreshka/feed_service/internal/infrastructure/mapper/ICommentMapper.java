package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;
import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", imports = {LocalDateTime.class})
public interface ICommentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "video", ignore = true)
    CommentEntity toEntity(CommentRequestDTO commentRequestDTO);
}