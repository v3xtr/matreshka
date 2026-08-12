package com.matreshka.media_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import kotlin.collections.ArrayDeque;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @Column(name = "s3Key", nullable = false)
    private String id;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaEntity> media = new ArrayList<>();
}
