package com.matreshka.profile_service.application;

import com.matreshka.profile_service.application.port.IReviewService;
import com.matreshka.profile_service.delivery.http.dto.ReviewRequestDTO;
import com.matreshka.profile_service.internal.infrastructure.mapper.IReviewMapper;
import com.matreshka.profile_service.internal.infrastructure.persistence.ReviewEntity;
import com.matreshka.profile_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.profile_service.internal.repo.IReviewRepo;
import com.matreshka.profile_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import jakarta.persistence.EntityNotFoundException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final IUserRepo userRepo;
    private final IReviewRepo reviewRepo;
    private final IReviewMapper reviewMapper;

    @Override
    @Transactional
    public void createReview(ReviewRequestDTO reviewRequestDTO) {
        UserEntity targetUser = userRepo.findById(reviewRequestDTO.targetUserId())
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

        ReviewEntity review = reviewMapper.toEntity(reviewRequestDTO, targetUser);

        reviewRepo.save(review);

        double currentRating = targetUser.getRating() != null ? targetUser.getRating() : 5.0;
        int currentCount = targetUser.getRatingsCount() != null ? targetUser.getRatingsCount() : 0;

        double newRating = ((currentRating * currentCount) + reviewRequestDTO.ratingValue()) / (currentCount + 1);
        newRating = Math.round(newRating * 10.0) / 10.0;

        targetUser.setRating(newRating);
        targetUser.setRatingsCount(currentCount + 1);

        userRepo.save(targetUser);
    }

    @Override
    @Transactional
    public void replyToReview(UUID reviewId, String currentUserId, String replyText) {

        ReviewEntity reviewEntity = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Отзыв не найден"));

        if (!reviewEntity.getTargetUser().getId().equals(currentUserId)) {
            throw new AccessDeniedException("Вы не можете отвечать на чужие отзывы");
        }

        if (Boolean.TRUE.equals(reviewEntity.getIsReplied())) {
            throw new IllegalStateException("Вы уже ответили на этот отзыв");
        }

        reviewEntity.setOwnerReply(replyText);
        reviewEntity.setIsReplied(true);

        reviewRepo.save(reviewEntity);
    }
}