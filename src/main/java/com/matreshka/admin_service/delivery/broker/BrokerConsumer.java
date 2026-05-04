package com.matreshka.admin_service.delivery.broker;

import com.matreshka.admin_service.delivery.broker.port.IBrokerConsumer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@Slf4j
@RequiredArgsConstructor
public class BrokerConsumer implements IBrokerConsumer {

    @Bean
    public Consumer<?> consumeAdvert(){
        return message -> {

        };
    }
}
