package com.matreshka.media_service.internal.infrastructure.persistence;

import com.matreshka.media_service.internal.domain.MEDIA_TYPE;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MediaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "file_name", unique = true, nullable = false, length = 512)
    private String fileName;

    @Column(name = "s3_key", unique = true, nullable = false, length = 512)
    private String s3Key;

    @Column(name = "title", nullable = true, length = 30)
    private String title;

    @Column(nullable = false, length = 2048)
    private String url;

    @Column(name = "cdn_url", length = 2048)
    private String cdnUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MEDIA_TYPE type;

    @Column(name = "mime_type", nullable = false)
    private String mimeType;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "thumbnail_url", length = 2048)
    private String thumbnailUrl;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "file_extension")
    private String fileExtension;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    @Column(name = "advert_id")
    private String advertId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

}