package com.matreshka.video_converter_worker.delivery.broker;

import com.matreshka.video_converter_worker.delivery.broker.dto.VideoErrorEvent;
import com.matreshka.video_converter_worker.delivery.broker.dto.VideoResultEvent;
import com.matreshka.video_converter_worker.delivery.broker.port.IBrokerProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrokerProducer implements IBrokerProducer {

    private final StreamBridge streamBridge;

    public void sendSuccess(String videoId, String resultUrl) {
        log.info("Отправляю успешный результат для видео: {}", videoId);

        VideoResultEvent event = new VideoResultEvent(videoId, resultUrl, "SUCCESS");

        boolean sent = streamBridge.send("video-success-out-0", event);

        if(!sent){
            log.error("Не удалось отправить успешный результат для видео: {}", videoId);
        }
    }

    public void sendError(String videoId, String error) {
        log.error("Отправляю ошибку для видео {}: {}", videoId, error);

        VideoErrorEvent event = new VideoErrorEvent(videoId, error, "FAILED");

        boolean sent = streamBridge.send("video-error-out-0", event);

        if(!sent){
            log.error("Не удалось отправить ошибку для видео: {}", videoId);
        }
    }
}