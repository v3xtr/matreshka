package com.matreshka.media_service.delivery.http;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.media_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;
import com.matreshka.media_service.internal.domain.MEDIA_TYPE;
import com.matreshka.media_service.internal.infrastructure.exception.UnAuthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/media")
@Slf4j
public class MediaController {

    private final IMediaService mediaService;
    private final IBrokerProducer brokerProducer;

    @PostMapping("/presigned")
    public ResponseEntity<PresignedUrlResponseDTO> generatePreSignedUrl(
            @AuthenticationPrincipal String userId,
            @RequestBody PresignedUrlRequestDTO requestDTO
    ) {
        PresignedUrlResponseDTO response = mediaService.generatePresignedUrl(userId, requestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @PostMapping("/create")
    public ResponseEntity<List<MediaResponseDTO>> createMedia(
            @RequestBody List<MediaCreateRequestDTO> mediaCreateRequestDTO,
            @AuthenticationPrincipal String userId
    ) {
        if (userId == null || "anonymousUser".equals(userId)) {
            throw new UnAuthorizedException("Unauthorized");
        }

        List<MediaResponseDTO> medias = mediaService.create(mediaCreateRequestDTO, userId);

        List<MediaResponseDTO> videos = medias.stream()
                .filter(m -> m.type() != null && m.type().equalsIgnoreCase(MEDIA_TYPE.VIDEOS.name()))
                .toList();

        if (!videos.isEmpty()) {
            brokerProducer.publishMedia(videos);
            log.info("Videos are not empty Media published: {}", videos);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(medias);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<MediaResponseDTO>> getUserMedia(
            @PathVariable String type,
            @AuthenticationPrincipal String userId
    ) {
        List<MediaResponseDTO> userMedias = mediaService.getUserMediaByType(userId, MEDIA_TYPE.valueOf(type.toUpperCase()));
        return ResponseEntity.status(HttpStatus.OK).body(userMedias);
    }

    @GetMapping("/videos")
    public ResponseEntity<List<MediaResponseDTO>> getVideosByUserId(@RequestParam String userId) {
        List<MediaResponseDTO> videos = mediaService.getUserMediaByType(userId, MEDIA_TYPE.VIDEOS);
        return ResponseEntity.ok(videos);
    }

    @DeleteMapping
    public ResponseEntity<String> delete(
            @RequestParam("s3Key") String s3Key,
            @RequestParam("id") UUID id
            ) {
        log.info("[MediaController] Request to delete s3Key: {}", s3Key);
        mediaService.deleteVideo(s3Key);
        brokerProducer.deleteMedia(new MediaDeleteEvent(id, s3Key));
        return ResponseEntity.status(HttpStatus.OK).body("Вы успешно удалили Медиа");
    }
}
