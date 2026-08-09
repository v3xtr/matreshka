package com.matreshka.feed_service.delivery.http;

import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.feed_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.feed_service.delivery.http.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/feed/video")
@RequiredArgsConstructor
@Slf4j
public class VideoController {

    private final IVideoService videoService;
    private final IBrokerProducer brokerProducer;

    @PostMapping("/add-view")
    public ResponseEntity<Void> addView(@Valid @RequestBody VideoRequestDTO videoRequestDTO){
        videoService.addView(videoRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user-views")
    public ResponseEntity<UserResponseDTO> getUserViews(@RequestParam String userId){
        return ResponseEntity.ok(videoService.getUserViews(userId));
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<VideoDetailResponseDTO> getVideo(
            @AuthenticationPrincipal String userId,
            @PathVariable UUID videoId
    ){
        return ResponseEntity.ok(videoService.getVideo(userId, videoId));
    }

    @GetMapping("/welcome-feed")
    public ResponseEntity<List<VideoShortResponseDTO>> getWelcomeFeed(@Valid @ModelAttribute VideoShortRequestDTO videoShortRequestDTO){
        return ResponseEntity.ok(videoService.getVideosWelcome(videoShortRequestDTO));
    }

    @PostMapping("/mark-as-favorite")
    public ResponseEntity<String> markAsFavorite(
            @Valid @RequestBody FavoriteRequestDTO dto,
            @AuthenticationPrincipal String userId
    ) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            UUID videoUuid = UUID.fromString(dto.videoId());
            videoService.markAsFavorite(userId, videoUuid);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid UUID format for videoId: " + dto.videoId());
        }
    }

    @PostMapping("/unmark-as-favorite")
    public ResponseEntity<String> unmarkAsFavorite(
            @Valid @RequestBody FavoriteRequestDTO dto,
            @AuthenticationPrincipal String userId
    ) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            UUID videoUuid = UUID.fromString(dto.videoId());
            videoService.unmarkAsFavorite(userId, videoUuid);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Неверный формат video id " + dto.videoId());
        }
    }

    @GetMapping("/favorites/{userId}")
    public ResponseEntity<List<UserWithVideosResponseDTO>> getFavoriteVideos(@PathVariable String userId){
        return ResponseEntity.ok(videoService.getFavoriteVideos(userId));
    }


    @PostMapping
    public ResponseEntity<Map<String, String>> deleteVideo(@RequestBody DeleteVideoRequestDTO deleteVideoRequestDTO){
        videoService.deleteVideo(deleteVideoRequestDTO);
        MediaDeleteEvent mediaDeleteEvent = new MediaDeleteEvent(
                UUID.fromString(deleteVideoRequestDTO.id()),
                deleteVideoRequestDTO.s3Key()
        );
        brokerProducer.publishMediaDeleted(mediaDeleteEvent);
        return ResponseEntity.status(200).body(Map.of("message", "Видео было успешно удалено"));
    }
}