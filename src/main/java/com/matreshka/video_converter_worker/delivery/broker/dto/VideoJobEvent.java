package com.matreshka.video_converter_worker.delivery.broker.dto;

public record VideoJobEvent(
        String id,
        String url
) {
}
