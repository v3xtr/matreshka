package com.matreshka.feed_service.delivery.http.dto;

import lombok.Builder;

@Builder
public record UserShortInfoDTO(
        String id,
        String name
) {}