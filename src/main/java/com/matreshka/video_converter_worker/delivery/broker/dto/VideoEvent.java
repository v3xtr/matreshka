package com.matreshka.video_converter_worker.delivery.broker.dto;

public record VideoEvent(
        String videoId,
        String url
) {
}
