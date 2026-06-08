package com.matreshka.feed_service.delivery.http.dto;

public record VideoShortRequestDTO(
        Integer page,
        Integer size,
        Double seed
) {
    public VideoShortRequestDTO {
        if (page == null) page = 0;
        if (size == null) size = 6;
        if (seed == null) seed = Math.random();
    }
}