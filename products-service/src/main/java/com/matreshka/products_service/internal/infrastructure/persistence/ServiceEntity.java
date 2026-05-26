package com.matreshka.products_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advert_id", nullable = false)
    private AdvertEntity advert;
}