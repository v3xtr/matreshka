package com.matreshka.auth_service.delivery.broker.dto;

public record UserRegisteredEvent(
        String userId,
        String email,
        String phone
) {
}
