package com.matreshka.profile_service.delivery.broker.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MediaCreatedEvent(
        String userId,
        String avatarUrl
) {}