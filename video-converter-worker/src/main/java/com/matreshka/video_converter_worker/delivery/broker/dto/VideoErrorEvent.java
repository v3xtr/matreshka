package com.matreshka.video_converter_worker.delivery.broker.dto;

public record VideoErrorEvent(
        String videoId,
        String errorMessage,
        String status
) {}