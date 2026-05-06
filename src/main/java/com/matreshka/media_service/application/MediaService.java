package com.matreshka.media_service.application;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;
import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.mapper.IMediaMapper;
import com.matreshka.media_service.internal.repo.IMediaRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService implements IMediaService {

    private final S3Presigner s3Presigner;
    private final S3Client s3Client;
    private final IMediaRepo mediaRepo;
    private final IMediaMapper mediaMapper;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public PresignedUrlResponseDTO generatePresignedUrl(String userId, PresignedUrlRequestDTO dto) {
        String fileExtension = dto.contentType().contains("/")
                ? dto.contentType().split("/")[1]
                : "bin";

        String folder = dto.contentType().startsWith("video") ? "videos" : "photos";

        String s3Key = String.format("%s/%s/%s.%s", userId, folder, UUID.randomUUID(), fileExtension);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .contentType(dto.contentType())
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);
        String url = presignedRequest.url().toString();

        log.info("Generated Presigned URL for user {}. Key: {}", userId, s3Key);

        return new PresignedUrlResponseDTO(url, s3Key);
    }

    @Override
    @Transactional
    public List<MediaResponseDTO> create(List<MediaCreateRequestDTO> dtos) {
        try {
            List<MediaEntity> mediaEntities = dtos.stream()
                    .map(mediaMapper::toEntity)
                    .toList();

            log.info(
                    "Creating media entities for user: {}",
                    mediaEntities.stream()
                            .map(MediaEntity::getFileName)
                            .collect(Collectors.joining(", "))
            );
            List<MediaEntity> savedEntities = mediaRepo.saveAll(mediaEntities);

            return savedEntities.stream()
                    .map(mediaMapper::toResponseDTO)
                    .toList();

        } catch (Exception e) {
            log.error("Failed to create media: {}", e.getMessage());
            throw new RuntimeException("Ошибка при сохранении медиа в базу данных");
        }
    }

    @Override
    @Transactional
    public List<MediaResponseDTO> getUserVideos(String userId, String type){
        List<MediaEntity> userMedias =  mediaRepo.findAllByTypeAndUserId(type, userId);

        return userMedias.stream()
                .map(mediaMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    @Override
    public void updateMediaThumbnail(String id, String url) {
        mediaRepo.updateThumbnailById(id, url);
    }

    @Override
    @Transactional
    public void delete(String s3Key) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            log.info("Successfully deleted object from S3: {}", s3Key);
            mediaRepo.deleteByS3Key(s3Key);
            log.info("Объект {}, был успешно удален", s3Key);
        } catch (S3Exception e) {
            log.error("Ошибка при удалении объекта из s3: {}", e.awsErrorDetails().errorMessage());
            throw new RuntimeException("");
        }
    }
}