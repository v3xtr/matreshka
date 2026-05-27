package com.matreshka.products_service.delivery.broker.port;

public interface IBrokerProducer {
    void publishDeleteAdvertEvent(String s3Key);
}
