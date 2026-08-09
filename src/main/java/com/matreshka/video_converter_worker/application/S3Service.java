package com.matreshka.video_converter_worker.application;

import com.matreshka.video_converter_worker.application.port.IS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service implements IS3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public File download(String s3Key) {
        log.info("Скачивание файла {} из S3...", s3Key);

        File tempFile;

        try {
            tempFile = File.createTempFile("input_" + UUID.randomUUID(), ".mp4");

            var request = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .build();

            Files.copy(s3Client.getObject(request), tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

            return tempFile;
        } catch (IOException e) {
            throw new RuntimeException("Ошибка при создании временного файла", e);
        }
    }

    @Override
    public String upload(File file) {
        log.info("Загрузка файла {} в S3...", file.getName());
        String s3Key = "processed/" + UUID.randomUUID() + ".mp4";

        var request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .build();

        s3Client.putObject(request, RequestBody.fromFile(file));

        if (file.delete()) {
            log.info("Временный файл {} удален", file.getName());
        }

        return s3Key;
    }
}