package com.matreshka.auth_service.delivery.broker.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public record UserRegisteredEvent(
        @JsonProperty("id")
        @JsonAlias({"userId", "id"})
        String id,
        String email,
        String name,
        String phone
) {
}