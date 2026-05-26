package com.matreshka.products_service.application.port;

import com.matreshka.products_service.delivery.broker.dto.VideoEvent;

public interface IVideoService {
    void processVideo(VideoEvent event);
}
