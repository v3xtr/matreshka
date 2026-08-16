package com.matreshka.notification_service.internal.mapper;

import com.matreshka.notification_service.delivery.http.dto.NotificationResponseDTO;
import com.matreshka.notification_service.internal.models.NotificationEvent;
import com.matreshka.notification_service.internal.infrastructure.persistence.persistence.NotificationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "title", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isRead", ignore = true)
    @Mapping(target = "body", source = "message")
    @Mapping(target = "userId", source = "receiverId")
    @Mapping(target = "fromUserId", source = "senderId")
    NotificationEntity toEntity(NotificationEvent notificationEvent);

    @Mapping(target = "message", source = "body")
    @Mapping(target = "createdAt", ignore = true)
    NotificationResponseDTO toResponse(NotificationEntity entity);
}