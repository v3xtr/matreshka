package com.matreshka.profile_service.delivery.http;

import com.matreshka.profile_service.application.port.IReviewService;
import com.matreshka.profile_service.delivery.http.dto.ReviewAnswerRequestDTO;
import com.matreshka.profile_service.delivery.http.dto.ReviewRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/profile/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final IReviewService reviewService;

    @PostMapping
    public ResponseEntity<Void> createReview(@RequestBody @Valid ReviewRequestDTO dto) {
        reviewService.createReview(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("#currentUserId == authentication.principal")
    @PatchMapping("/{reviewId}/reply")
    public ResponseEntity<Void> replyToReview(
            @PathVariable UUID reviewId,
            @AuthenticationPrincipal String currentUserId,
            @RequestBody ReviewAnswerRequestDTO reviewAnswerRequestDTO
    ){
        reviewService.replyToReview(reviewId, currentUserId, reviewAnswerRequestDTO.replyText());
        return ResponseEntity.ok().build();
    }
}
