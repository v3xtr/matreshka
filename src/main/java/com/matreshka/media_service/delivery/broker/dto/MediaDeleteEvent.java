package com.matreshka.media_service.delivery.broker.dto;

import java.util.UUID;

public record MediaDeleteEvent(
        UUID id,
        String s3Key
) {
}
