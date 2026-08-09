package com.matreshka.chat_service.internal.infrastructure.mapper;

import com.matreshka.chat_service.delivery.broker.dto.NotificationEvent;
import com.matreshka.chat_service.delivery.http.dto.MessageResponseDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageRequestDTO;
import com.matreshka.chat_service.internal.infrastructure.persistence.MessageDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IChatMapper {

    @Mapping(target = "isRead", ignore = true)
    @Mapping(target = "message", source = "message")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "roomId", ignore = true)
    @Mapping(target = "id", ignore = true)
    MessageDocument toDocument(SendMessageRequestDTO messageDto);

    MessageResponseDTO toResponse(MessageDocument messageDocument);

    MessageResponseDTO toResponse(NotificationEvent event);

}
