package com.matreshka.feed_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserEntity {
    @Id
    private String id;

    private String name;

    @Max(value = 5)
    @Min(value = 1)
    @Builder.Default
    private Double rating = 5.0;

    private String avatar;

    @OneToMany(fetch = FetchType.LAZY)
    private List<VideoEntity> videos;

    @OneToMany(fetch = FetchType.LAZY)
    private List<CommentEntity> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<FavoriteVideo> favoriteVideos;
}
