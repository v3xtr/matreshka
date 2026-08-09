package com.matreshla.vk_oauth.delivery.http.dto;

public record UserResponseDTO(
        String accessToken,
        String email,
        String firstName,
        String phone
) {
}