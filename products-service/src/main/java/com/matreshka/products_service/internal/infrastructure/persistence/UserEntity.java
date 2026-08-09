package com.matreshka.products_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
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
    private String id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_favorite_adverts", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "advert_id")
    )
    @Builder.Default
    private List<AdvertEntity> favoriteAdverts = new ArrayList<>();
}