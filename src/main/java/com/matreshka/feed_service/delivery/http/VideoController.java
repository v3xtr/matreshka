package com.matreshka.feed_service.delivery.http;

import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.http.dto.UserResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoDetailResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feed/video")
@RequiredArgsConstructor
@Slf4j
public class VideoController {

    private final IVideoService videoService;

    @PostMapping("/like")
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
}
