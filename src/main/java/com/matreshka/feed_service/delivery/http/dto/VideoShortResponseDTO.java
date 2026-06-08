package com.matreshka.feed_service.delivery.http.dto;

public record VideoShortDTO(
        Long id,
        String s3Url,
        long likes,
        String userName
) {}