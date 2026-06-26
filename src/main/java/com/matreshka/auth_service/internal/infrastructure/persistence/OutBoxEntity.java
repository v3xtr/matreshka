package com.matreshka.auth_service.internal.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "outbox_events")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OutBoxEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aggregate_id")
    private String aggregateId;

    private String payload;

    private String topic;

    @Builder.Default
    private boolean isProcessed = false;
}
