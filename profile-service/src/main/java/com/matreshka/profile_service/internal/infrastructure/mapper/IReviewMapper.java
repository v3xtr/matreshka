package com.matreshka.profile_service.internal.infrastructure.mapper;

import com.matreshka.profile_service.delivery.http.dto.ReviewRequestDTO;
import com.matreshka.profile_service.delivery.http.dto.ReviewResponseDTO;
import com.matreshka.profile_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;


import com.matreshka.profile_service.internal.infrastructure.persistence.ReviewEntity;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IReviewMapper {

    @Mapping(target = "targetUserId", source = "targetUser.id")
    @Mapping(target = "authorName", ignore = true)
    @Mapping(target = "authorAvatarUrl", ignore = true)
    @Mapping(target = "createdAt", expression = "java(review.getCreatedAt() != null ? review.getCreatedAt().toString() : null)")
    ReviewResponseDTO toResponseDTO(ReviewEntity review);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "targetUser", source = "targetUser")
    @Mapping(target = "rating", source = "dto.ratingValue")
    @Mapping(target = "ownerReply", ignore = true)
    @Mapping(target = "isReplied", constant = "false")
    @Mapping(target = "createdAt", ignore = true)
    ReviewEntity toEntity(ReviewRequestDTO dto, UserEntity targetUser);
}