package com.matreshka.thumbnail_service.internal.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MediaMessage(
    @JsonProperty("id")
    String mediaId,

    String thumbnailUrl,
    String s3Key,
    String type
) {
}