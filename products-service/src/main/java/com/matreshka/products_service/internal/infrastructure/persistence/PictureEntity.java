package com.matreshka.products_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pictures")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PictureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "picture_url", nullable = false)
    private String pictureUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advert_id", nullable = false)
    private AdvertEntity advert;
}