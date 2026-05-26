package com.matreshka.products_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "work_period")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class WorkPeriodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "from_day", nullable = false)
    private Integer fromDay;

    @Column(name = "to_day", nullable = false)
    private Integer toDay;

    @Column(name = "from_time")
    private String fromTime;

    @Column(name = "to_time")
    private String toTime;

    @Column(name = "is24h", nullable = false)
    @Builder.Default
    private Boolean is24h = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advert_id", nullable = false)
    private AdvertEntity advert;
}