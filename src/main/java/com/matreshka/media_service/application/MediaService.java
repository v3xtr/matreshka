package com.matreshka.media_service.application;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;
import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.mapper.IMediaMapper;
import com.matreshka.media_service.internal.repo.IMediaRepo;
import com.matreshka.media_service.internal.repo.IUserRepo;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService implements IMediaService {

    private final S3Presigner s3Presigner;
    private final S3Client s3Client;
    private final IMediaRepo mediaRepo;
    private final IMediaMapper mediaMapper;
    private final IUserRepo userRepo;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public PresignedUrlResponseDTO generatePresignedUrl(String userId, PresignedUrlRequestDTO dto) {
        String contentType = dto.contentType();
        String fileExtension = (contentType != null && contentType.contains("/"))
                ? contentType.split("/")[1]
                : "bin";

        String folder = (contentType != null && contentType.equals("video")) ? "videos" : "photos";

        String s3Key = String.format("%s/%s/%s.%s", userId, folder, UUID.randomUUID(), fileExtension);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);
        String url = presignedRequest.url().toString();

        log.info("Generated Presigned URL for user {}. Bucket: {}, Key: {}, Content-Type (excluded from signature): {}",
                userId, bucketName, s3Key, contentType);

        return new PresignedUrlResponseDTO(url, s3Key);
    }

    @Override
    @Transactional
    public List<MediaResponseDTO> create(List<MediaCreateRequestDTO> dtos, String userId) {
        try {
            UserEntity user = userRepo.findById(userId)
                    .orElseGet(() -> userRepo.save(new UserEntity(userId, null)));

            List<MediaEntity> mediaEntities = dtos.stream()
                    .map(dto -> {
                        MediaEntity entity = mediaMapper.toEntity(dto);

                        entity.setId(null);

                        entity.setFileName(UUID.randomUUID().toString());
                        entity.setUser(user);
                        return entity;
                    })
                    .toList();

            log.info("Final check: first entity id is {}", mediaEntities.get(0).getId()); // Должно быть null

            List<MediaEntity> saved = mediaRepo.saveAll(mediaEntities);
            return saved.stream().map(mediaMapper::toResponseDTO).toList();
        } catch (Exception e) {
            log.error("DB Error: {}", e.getMessage(), e); // Добавил вывод всего стека ошибки (e)
            throw new RuntimeException("Internal Server Error");
        }
    }

    @Override
    @Transactional
    public List<MediaResponseDTO> getUserVideos(String userId, String type) {
        return mediaRepo.findAllByParams(type, userId).stream()
                .map(mediaMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional
    public void updateMediaThumbnail(String id, String url) {
        try {
            UUID mediaUuid = UUID.fromString(id);
            mediaRepo.updateThumbnailById(mediaUuid, url);
        } catch (IllegalArgumentException e) {
            log.error("Критическая ошибка: Пришел невалидный UUID медиа-файла: {}", id);
        }
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
            log.info("Deleted from S3: {}", s3Key);

            mediaRepo.deleteByS3Key(s3Key);
            log.info("Deleted from DB: {}", s3Key);
        } catch (S3Exception e) {
            log.error("S3 Delete Error: {}", e.awsErrorDetails().errorMessage());
            throw new RuntimeException("S3 Storage Error", e);
        }
    }
}