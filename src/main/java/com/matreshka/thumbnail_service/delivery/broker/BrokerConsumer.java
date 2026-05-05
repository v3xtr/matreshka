package com.matreshka.thumbnail_service.delivery.broker;

import com.matreshka.thumbnail_service.application.port.IThumbnailService;
import com.matreshka.thumbnail_service.internal.model.MediaMessage;
import com.matreshka.thumbnail_service.internal.model.ThumbnailResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;
import java.util.function.Consumer;

@Service
@Slf4j
@RequiredArgsConstructor
public class BrokerConsumer {

    private final IThumbnailService thumbnailService;
    private final StreamBridge streamBridge;

    @Bean
    public Consumer<MediaMessage> consumeMedia() {
        return event -> {
            log.info("Начало обработки видео: {}", event.s3Key());

            if (event.mediaId() == null) {
                log.error("MEDIA NULL нужно проверить JSON");
                return;
            }

            Path videoPath = null;
            Path thumbPath = null;

            try {
                videoPath = thumbnailService.downloadVideo(event.s3Key());

                thumbPath = Files.createTempFile("thumb_" + event.mediaId() + "_", ".jpg");

                thumbnailService.generateThumbnail(
                        videoPath.toString(),
                        thumbPath.toString()
                );

                String thumbS3Key = "thumbnails/" + UUID.randomUUID() + ".jpg";
                thumbnailService.uploadFile(thumbS3Key, thumbPath);

                ThumbnailResult result =
                        new ThumbnailResult(event.mediaId(), thumbS3Key);

                streamBridge.send("publishMedia-out-0", result);

            } catch (Exception e) {
                log.error("Критическая ошибка воркера. mediaId={}, s3Key={}",
                        event.mediaId(), event.s3Key(), e);
                throw new RuntimeException(e);
            } finally {
                try {
                    if (videoPath != null) Files.deleteIfExists(videoPath);
                    if (thumbPath != null) Files.deleteIfExists(thumbPath);
                } catch (IOException e) {
                    log.error("Не удалось удалить временные файлы", e);
                }
            }
        };
    }
}