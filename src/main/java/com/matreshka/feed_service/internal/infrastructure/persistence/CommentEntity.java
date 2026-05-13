package com.matreshka.feed_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "video_id")
    private UUID videoId;

    @Column(name = "user_id")
    private UUID userId;

    private String text;

    @Column(name = "parent_id", nullable = true)
    private UUID parentId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private VideoEntity video;
}
