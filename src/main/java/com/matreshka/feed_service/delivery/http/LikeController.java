package com.matreshka.feed_service.delivery.http;

import com.matreshka.feed_service.application.port.ILikeService;
import com.matreshka.feed_service.delivery.http.dto.LikeRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feed/")
@RequiredArgsConstructor
@Slf4j
public class LikeController {

    private final ILikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<String> like(@Valid @RequestBody LikeRequestDTO likeRequestDTO) {
        likeService.like(likeRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/unlike")
    public ResponseEntity<String> unlike(@Valid @RequestBody LikeRequestDTO likeRequestDTO) {
        likeService.unlike(likeRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/like-count")
    public ResponseEntity<Long> getLikeCount(@Valid @RequestBody String videoId) {
        long likes = likeService.getLikesCount(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(likes);
    }
}
