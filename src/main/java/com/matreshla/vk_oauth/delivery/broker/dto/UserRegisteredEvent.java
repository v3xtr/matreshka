package com.matreshla.vk_oauth.delivery.broker.dto;

public record UserRegisteredEvent(
        String id,
        String name,
        String phone,
        String email
) {
}
