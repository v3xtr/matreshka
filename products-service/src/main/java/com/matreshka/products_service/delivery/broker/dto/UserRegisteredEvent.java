package com.matreshka.products_service.delivery.broker.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserRegisteredEvent(
        String id
) {
}
