package com.matreshka.products_service.application.port;

import com.matreshka.products_service.delivery.broker.dto.MediaEvent;

public interface IMediaService {
    void processMedia(MediaEvent event);
}
