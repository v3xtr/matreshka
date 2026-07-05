package com.matreshka.chat_service.internal.infrastructure.mapper;

import com.matreshka.chat_service.delivery.http.dto.SendMessageRequestDTO;
import com.matreshka.chat_service.internal.infrastructure.persistence.MessageDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IChatMapper {

    @Mapping(target = "message", source = "message")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "roomId", ignore = true)
    @Mapping(target = "id", ignore = true)
    MessageDocument toDocument(SendMessageRequestDTO messageDto);
}
