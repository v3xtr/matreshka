package com.matreshka.feed_service.delivery.broker.port;

import com.matreshka.feed_service.delivery.broker.dto.MediaDeleteEvent;

public interface IBrokerProducer {
    void publishMediaDeleted(MediaDeleteEvent mediaDeleteEvent);
}
