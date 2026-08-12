package com.matreshka.media_service.application;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;
import com.matreshka.media_service.internal.domain.MEDIA_TYPE;
import com.matreshka.media_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.mapper.IMediaMapper;
import com.matreshka.media_service.internal.repo.IMediaRepo;
import com.matreshka.media_service.internal.repo.IUserRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.time.LocalDateTime;
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
        String type = dto.type();

        String fileExtension = (type != null && type.contains("/"))
                ? type.split("/")[1]
                : "bin";

        String folder;
        
        if (type != null && type.contains("review")) {
            folder = "review_photo";
        } else if (type != null && type.startsWith("video")) {
            folder = "videos";
        } else {
            folder = "photos";
        }

        return formPresignedUrl(userId, folder, fileExtension, type);
    }

    @Override
    @Transactional
    public List<MediaResponseDTO> create(List<MediaCreateRequestDTO> dtos, String userId) {
        try {

            if(dtos.isEmpty()){
                log.info("No media to create dto is empty");
                throw new BadRequestException("Медиа для создания не передано");
            }

            UserEntity user = userRepo.findById(userId)
                    .orElseGet(() -> userRepo.save(new UserEntity(userId, null)));

            List<MediaEntity> mediaEntities = dtos.stream()
                    .map(dto -> {
                        MediaEntity entity = mediaMapper.toEntity(dto);
                        entity.setFileName(UUID.randomUUID().toString());
                        entity.setUser(user);
                        entity.setS3Key(dto.s3Key());
                        entity.setPublishedAt(LocalDateTime.now());
                        return entity;
                    })
                    .toList();

            log.info("Final check: first entity s3Key is {}", mediaEntities.getFirst());

            List<MediaEntity> saved = mediaRepo.saveAll(mediaEntities);
            return saved.stream().map(mediaMapper::toResponseDTO).toList();
        } catch (Exception e) {
            log.error("DB Error: {}", e.getMessage(), e);
            throw new RuntimeException("Internal Server Error");
        }
    }

    @Override
    @Transactional
    public List<MediaResponseDTO> getUserMediaByType(String userId, MEDIA_TYPE type) {
        log.error("Ошибка точно тут брат !");
        return mediaRepo.findAllByParams(type, userId).stream()
                .map(mediaMapper::toResponseDTO)
                .toList();
    }


    @Override
    @Transactional
    public void deleteVideo(String s3Key){
        try{
            mediaRepo.deleteByS3Key(s3Key);
        }catch (Exception e){
            log.error("Error deleting video", e);
            throw new RuntimeException("Внутряняя ошибка сервера");
        }
    }

    @Override
    @Transactional
    public void deleteVideo(MediaDeleteEvent dto) {
        try {
            MediaEntity videoEntity;

            if (dto.id() != null) {
                videoEntity = mediaRepo.findById(dto.id())
                        .orElseThrow(() -> new EntityNotFoundException("Видео не найдено"));
                mediaRepo.delete(videoEntity);
            } else {
                videoEntity = mediaRepo.findByS3Key(dto.s3Key())
                        .orElseThrow(() -> new EntityNotFoundException("Видео не найдено"));
                mediaRepo.delete(videoEntity);
            }

            if (videoEntity.getS3Key() != null) {
                DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(videoEntity.getS3Key())
                        .build();
                s3Client.deleteObject(deleteObjectRequest);
                log.info("Deleted from S3: {}", videoEntity.getS3Key());
            }

        } catch (Exception e) {
            log.error("Error deleting video", e);
            throw new RuntimeException("Не удалось удалить видео", e);
        }
    }


    private PresignedUrlResponseDTO formPresignedUrl(String userId, String folder, String fileExtension, String type){

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
                userId, bucketName, s3Key, type);

        return new PresignedUrlResponseDTO(url, s3Key);
    }

}