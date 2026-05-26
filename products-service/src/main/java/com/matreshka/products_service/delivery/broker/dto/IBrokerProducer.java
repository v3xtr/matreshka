package com.matreshka.products_service.delivery.broker.dto;

public interface IBrokerProducer {
    void publishDeleteAdvertEvent(String s3Key);
}
