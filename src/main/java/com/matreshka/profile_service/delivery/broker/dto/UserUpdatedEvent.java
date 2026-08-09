package com.matreshka.profile_service.delivery.broker.dto;

public record UserUpdatedEvent(
    String userId,
    String avatar,
    String name,
    String rating
) {
}
