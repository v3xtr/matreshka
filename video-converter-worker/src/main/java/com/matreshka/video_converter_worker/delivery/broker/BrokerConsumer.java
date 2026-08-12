package com.matreshka.video_converter_worker.delivery.broker;

import com.matreshka.video_converter_worker.application.port.IVideoProcessor;
import com.matreshka.video_converter_worker.delivery.broker.dto.VideoEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IVideoProcessor videoProcessor;

    @Bean
    public Consumer<VideoEvent> consumeMessage(){
        return videoProcessor::processVideo;
    }
}
