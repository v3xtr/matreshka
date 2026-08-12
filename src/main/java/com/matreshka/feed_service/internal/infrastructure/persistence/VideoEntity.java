package com.matreshka.feed_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.domain.Persistable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "videos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class VideoEntity implements Persistable<UUID> {

    @Id
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "cdn_url")
    private String cdnUrl;

    @Column(name = "mime_type")
    private String mimeType;

    @Builder.Default
    private long likes = 0;

    @OneToMany(mappedBy = "video", fetch = FetchType.LAZY)
    private List<CommentEntity> comments;

    @OneToMany(mappedBy = "video")
    private List<ViewEntity> views;

    @Column(name = "views_count")
    @Builder.Default
    private long viewsCount = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "published_at")
    @CreationTimestamp
    private LocalDateTime publishedAt;

    @Column(name = "advert_id")
    private UUID advertId;

    @Column(name = "s3_key")
    private String s3Key;

    @Transient
    @Builder.Default
    private boolean isNew = true;

    @Override
    public boolean isNew() {
        return isNew;
    }

    @PostLoad
    @PostPersist
    void markNotNew() {
        this.isNew = false;
    }
}