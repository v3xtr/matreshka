package com.matreshka.feed_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
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

    @OneToMany(fetch = FetchType.LAZY)
    private List<VideoEntity> videos;

    @OneToMany(fetch = FetchType.LAZY)
    private List<CommentEntity> comments;
}
