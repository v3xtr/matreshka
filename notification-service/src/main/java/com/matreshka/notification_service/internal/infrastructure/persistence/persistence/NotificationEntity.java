package com.matreshka.notification_service.internal.infrastructure.persistence.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;

    private String body;

    private String userId;

    private String fromUserId;

    @Column(length = 512, nullable = false)
    private String token;

    @Builder.Default
    private boolean isRead = false;
}
