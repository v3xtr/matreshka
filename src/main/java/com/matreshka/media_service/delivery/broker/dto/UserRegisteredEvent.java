package com.matreshka.media_service.delivery.broker.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserRegisteredEvent(
        @JsonProperty("id")
        @JsonAlias({"userId", "id"})
        String id
) {
}