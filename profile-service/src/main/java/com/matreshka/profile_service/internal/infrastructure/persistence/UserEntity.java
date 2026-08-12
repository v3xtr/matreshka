package com.matreshka.profile_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
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
    private String id;

    private String email;
    private String phone;
    private String name;
    private String city;
    private String description;
    private String address;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    private ROLE role;

    @Builder.Default
    @Column(name = "rating")
    private Double rating = 5.0;

    @Builder.Default
    @Column(name = "ratings_count")
    private Integer ratingsCount = 0;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmployeeEntity> employeeEntities;

    @OneToMany(mappedBy = "targetUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewEntity> receivedReviews;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}