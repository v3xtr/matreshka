package com.matreshka.feed_service.delivery.http;

import com.matreshka.feed_service.application.port.ICommentsService;
import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/feed/comments")
@RequiredArgsConstructor
public class CommentController {

    private final ICommentsService commentsService;

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CommentRequestDTO commentRequestDTO) {
        commentsService.addComment(commentRequestDTO);
        return ResponseEntity.ok().build();
    }
}
