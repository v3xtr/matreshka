package com.matreshla.vk_oauth.internal.infrastructure.model;

public record UserModel(
        String userId,
        String firstName,
        String email,
        String phone
) {
}
