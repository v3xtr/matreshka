package com.matreshla.vk_oauth.delivery.http.dto;

import com.matreshla.vk_oauth.delivery.broker.dto.UserRegisteredEvent;

public record CombinedUserResponseDTO(
        UserResponseDTO userResponseDTO,
        UserRegisteredEvent userRegisteredEvent
) {
}
