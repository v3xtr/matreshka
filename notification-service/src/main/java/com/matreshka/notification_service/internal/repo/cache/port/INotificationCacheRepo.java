package com.matreshka.notification_service.internal.repo.cache.port;

import com.matreshka.notification_service.internal.models.NotificationEvent;

import java.util.List;

public interface INotificationCacheRepo {
    void saveToCache(NotificationEvent notificationEvent);
    List<NotificationEvent> popAll();

}
