package com.matreshka.thumbnail_service.internal.model;

public record ThumbnailResult (
    String mediaId,
    String thumbnailUrl
){}