package com.matreshka.feed_service.delivery.broker.dto;

public record UserRegisteredEvent(
        String id,
        String username
) {
}
