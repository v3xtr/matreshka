package com.matreshka.profile_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_user_id", nullable = false)
    private UserEntity targetUser;

    @Column(name = "author_id", nullable = false)
    private String authorId;

    @Min(1)
    @Max(5)
    @Builder.Default
    private Integer rating = 5;

    @Column(nullable = false)
    private String comment;

    @Column(name = "owner_reply")
    private String ownerReply;

    @Builder.Default
    @Column(name = "is_replied", nullable = false)
    private Boolean isReplied = false;

    @Column(name = "product_id")
    private UUID productId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}