package com.matreshka.video_converter_worker.application;


import com.matreshka.video_converter_worker.application.port.IS3Service;
import com.matreshka.video_converter_worker.application.port.IVideoConverter;
import com.matreshka.video_converter_worker.application.port.IVideoProcessor;
import com.matreshka.video_converter_worker.delivery.broker.dto.VideoEvent;
import com.matreshka.video_converter_worker.delivery.broker.port.IBrokerProducer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@Service
@Slf4j
public class VideoProcessor implements IVideoProcessor {

    private final IS3Service s3;
    private final IVideoConverter videoConverter;
    private final IBrokerProducer brokerProducer;
    private final ThreadPoolTaskExecutor cpuExecutor;
    private final Executor ioExecutor;

    public VideoProcessor(
            IS3Service s3,
            IVideoConverter videoConverter,
            IBrokerProducer brokerProducer,
            @Qualifier("videoCpuExecutor") ThreadPoolTaskExecutor cpuExecutor,
            @Qualifier("ioExecutor") Executor ioExecutor
    ) {
        this.s3 = s3;
        this.videoConverter = videoConverter;
        this.brokerProducer = brokerProducer;
        this.cpuExecutor = cpuExecutor;
        this.ioExecutor = ioExecutor;
    }

    @Override
    public void processVideo(VideoEvent event) {
        log.info("Запуск пайплайна для видео: {}", event.videoId());

        CompletableFuture.supplyAsync(() -> s3.download(event.url()), ioExecutor)
                .thenApplyAsync(videoConverter::convert, cpuExecutor)
                .thenApplyAsync(s3::upload, ioExecutor)
                .thenAccept(url -> {
                    brokerProducer.sendSuccess(event.videoId(), url, event.advertId());
                    log.info("Успех! Результат: {}", url);
                })
                .exceptionally(ex -> {
                    log.error("Пайплайн завершился с ошибкой для {}: {}", event.videoId(), ex.getMessage());
                    brokerProducer.sendError(event.videoId(), ex.getMessage());
                    return null;
                });
    }
}
