package com.matreshka.products_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "media")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MediaEntity {
    @Id
    private String id;

    @Column(name = "cdn_url")
    private String cdnUrl;

    private String type;

    @Column(name = "mime_type")
    private String mimeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advert_id")
    private AdvertEntity advert;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}