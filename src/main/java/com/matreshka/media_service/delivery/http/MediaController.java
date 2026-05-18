package com.matreshka.media_service.delivery.http;

import com.matreshka.media_service.application.port.IMediaService;
import com.matreshka.media_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.media_service.delivery.http.dto.MediaCreateRequestDTO;
import com.matreshka.media_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlRequestDTO;
import com.matreshka.media_service.delivery.http.dto.PresignedUrlResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<List<MediaResponseDTO>> createMedia(
            @RequestBody List<MediaCreateRequestDTO> mediaCreateRequestDTO,
            @AuthenticationPrincipal String userId
    ) {
        List<MediaResponseDTO> medias = mediaService.create(mediaCreateRequestDTO, userId);
        for(MediaResponseDTO media : medias) {
            if(media.type().equals("video")){
                brokerProducer.publishMedia(medias);
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(medias);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<MediaResponseDTO>> getUserMedia(
            @PathVariable String type,
            @AuthenticationPrincipal String userId
    ){
        List<MediaResponseDTO> userMedias = mediaService.getUserVideos(userId, type);
        return ResponseEntity.status(HttpStatus.OK).body(userMedias);
    }

    @DeleteMapping("/{s3Key}")
    public ResponseEntity<String> delete(@PathVariable String s3Key){
        mediaService.delete(s3Key);
        return ResponseEntity.ok("Вы успешно удалил Медиа");
    }
}
