package com.matreshka.auth_service.delivery.broker.port;

import com.matreshka.auth_service.delivery.http.dto.RegisterUserResponseDTO;

public interface IBrokerProducer {
    void produce(RegisterUserResponseDTO userDto);
}
