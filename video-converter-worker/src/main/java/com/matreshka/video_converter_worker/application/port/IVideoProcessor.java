package com.matreshka.video_converter_worker.application.port;

import com.matreshka.video_converter_worker.delivery.broker.dto.VideoEvent;

public interface IVideoProcessor {
    void processVideo(VideoEvent videoEvent);
}
