package com.matreshka.profile_service.application.port;

import com.matreshka.profile_service.delivery.http.dto.ReviewRequestDTO;

import java.util.UUID;

public interface IReviewService {
    void createReview(ReviewRequestDTO reviewRequestDTO);
    void replyToReview(UUID reviewId, String currentUserId, String replyText);
}
