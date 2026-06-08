package com.matreshka.feed_service.delivery.http;

import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.http.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed/video")
@RequiredArgsConstructor
@Slf4j
public class VideoController {

    private final IVideoService videoService;

    @PostMapping("/addView")
    public ResponseEntity<String> addView(@Valid @RequestBody VideoRequestDTO videoRequestDTO){
        videoService.addView(videoRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/user-views")
    public ResponseEntity<UserResponseDTO> getUserViews(@Valid @RequestParam String userId){
        UserResponseDTO views = videoService.getUserViews(userId);
        return ResponseEntity.status(HttpStatus.OK).body(views);
    }

    @GetMapping("/")
    public ResponseEntity<VideoDetailResponseDTO> getVideo(@Valid @RequestParam String videoId){
        VideoDetailResponseDTO video = videoService.getVideo(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(video);
    }

    @GetMapping("welcome-feed")
    public ResponseEntity<List<VideoShortResponseDTO>> getWelcomeFeed(@Valid @RequestParam VideoShortRequestDTO videoShortRequestDTO){
        List<VideoShortResponseDTO> videosWithoutInfo = videoService.getVideosWelcome(videoShortRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(videosWithoutInfo);
    }

    @PostMapping("/mark-as-favorite")
    public ResponseEntity<String> markAsFavorite(
            @Valid @RequestBody String videoId,
            @AuthenticationPrincipal String userId
    ){
        videoService.markAsFavorite(userId, videoId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/unmark-as-favorite")
    public ResponseEntity<String> unmarkAsFavorite(
            @Valid @RequestBody String videoId,
            @AuthenticationPrincipal String userId
    ){
        videoService.unmarkAsFavorite(userId, videoId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserWithVideosResponseDTO>> getFavoriteVideos(@PathVariable String userId){
        List<UserWithVideosResponseDTO> videos = videoService.getFavoriteVideos(userId);
        return ResponseEntity.status(HttpStatus.OK).body(videos);
    }
}
