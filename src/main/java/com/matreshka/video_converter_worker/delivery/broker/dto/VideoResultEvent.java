package com.matreshka.video_converter_worker.delivery.broker.dto;

public record VideoResultEvent(
        String videoId,
        String s3Url,
        String status
) {}
