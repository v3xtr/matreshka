package com.matreshka.thumbnail_service.application;

import com.matreshka.thumbnail_service.application.port.IThumbnailService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class ThumbnailService implements IThumbnailService {

    @Value("${ffmpeg.path}")
    private String ffmpegPath;

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public void generateThumbnail(String inputPath, String outputPath) {
        try {
            FFmpeg ffmpeg = new FFmpeg(ffmpegPath);
            FFmpegBuilder builder = new FFmpegBuilder()
                    .setInput(inputPath)
                    .addOutput(outputPath)
                    .setFrames(1)
                    .setStartOffset(2, TimeUnit.SECONDS)
                    .setVideoFilter("scale=640:-1")
                    .setFormat("image2")
                    .done();

            FFmpegExecutor executor = new FFmpegExecutor(ffmpeg);
            executor.createJob(builder).run();

            log.info("Thumbnail создан: " + outputPath);
        } catch (Exception e) {
            log.error("Ошибка FFmpeg: " + e.getMessage());
            throw new RuntimeException("Ошибка при генерации превью", e);
        }
    }

    public Path downloadVideo(String s3Key) throws IOException {
        Path tempFile = Files.createTempFile("video_", ".tmp");

        try {
            GetObjectRequest request = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .build();

            s3Client.getObject(request, ResponseTransformer.toFile(tempFile));

            return tempFile;

        } catch (Exception e) {
            Files.deleteIfExists(tempFile);
            log.error("Ошибка при скачивании файла из S3", e);
            throw e;
        }
    }

    public String uploadFile(String s3Key, Path filePath){
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .contentType("image/jpeg")
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromFile(filePath));
        log.info("Тамбнейл загружен в S3: {}", s3Key);

        return s3Key;
    }
}
