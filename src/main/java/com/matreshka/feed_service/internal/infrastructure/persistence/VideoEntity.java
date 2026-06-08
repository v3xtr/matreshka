package com.matreshka.feed_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "videos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class VideoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "media_id")
    private String mediaId;

    @Column(name = "cdn_url")
    private String cdnUrl;

    @Column(name = "mime_type")
    private String mimeType;

    @Builder.Default
    private long likes = 0;

    @OneToMany(mappedBy = "video", fetch = FetchType.LAZY)
    private List<CommentEntity> comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
