package com.matreshka.chat_service.internal.infrastructure.mapper;

import com.matreshka.chat_service.delivery.http.dto.RoomResponseDTO;
import com.matreshka.chat_service.internal.infrastructure.persistence.RoomDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IRoomMapper {

    @Mapping(target = "userA", expression = "java(roomDocument.getParticipants() != null && !roomDocument.getParticipants().isEmpty() ? roomDocument.getParticipants().get(0) : null)")
    @Mapping(target = "userB", expression = "java(roomDocument.getParticipants() != null && roomDocument.getParticipants().size() > 1 ? roomDocument.getParticipants().get(1) : null)")
    @Mapping(target = "productId", expression = "java(roomDocument.getProductId() != null ? roomDocument.getProductId().toString() : null)")
    RoomResponseDTO toResponse(RoomDocument roomDocument);
}