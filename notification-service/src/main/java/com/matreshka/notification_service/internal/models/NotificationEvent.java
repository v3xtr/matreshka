package com.matreshka.notification_service.internal.models;

public record NotificationEvent(
    String title,
    String body,
    String userId,
    String fromUserId
) {
}

