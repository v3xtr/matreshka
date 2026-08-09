package com.matreshka.feed_service.delivery.broker.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public record UserUpdatedEvent(
        @JsonProperty("id")
        @JsonAlias({"userId", "id"})
        String id,
        String avatar,
        String name,
        String rating
) {
}
