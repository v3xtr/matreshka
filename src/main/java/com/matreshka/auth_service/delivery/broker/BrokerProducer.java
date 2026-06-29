package com.matreshka.auth_service.delivery.broker;

import com.matreshka.auth_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.auth_service.delivery.http.dto.RegisterUserResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    @Override
    public void produce(RegisterUserResponseDTO userDto) {
        log.info("[BrokerProducer] Sending DTO directly to StreamBridge: {}", userDto);

        boolean sent = streamBridge.send("outputMappingFunc-out-0", userDto);

        if (!sent) {
            log.error("Failed to send event to binding: outputMappingFunc-out-0");
            throw new RuntimeException("Ошибка сервера");
        }
    }
}