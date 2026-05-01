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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String title;

    private String body;

    private UUID userId;

    private String fromUserId;

    @Builder.Default
    private boolean isRead = false;
}
