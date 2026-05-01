package com.matreshka.notification_service.internal.repo.cache;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matreshka.notification_service.internal.models.NotificationEvent;
import com.matreshka.notification_service.internal.repo.cache.port.INotificationCacheRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
@Slf4j
public class NotificationCacheRepo implements INotificationCacheRepo {
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void saveToCache(NotificationEvent notificationEvent){
        try{
            String jsonValue = objectMapper.writeValueAsString(notificationEvent);
            redisTemplate.opsForValue().set(notificationEvent.userId(), jsonValue);
        }catch (Exception e){
            log.error("[NotificationCacheRepo saveToCache]: Ошибка при сохранении в кэш", e);
            throw new RuntimeException("Internal Server Error");
        }
    }

    public List<NotificationEvent> popAll() {
        String key = "notifications_queue";

        Long size = redisTemplate.opsForList().size(key);
        if (size == null || size == 0) return Collections.emptyList();

        List<String> jsons = redisTemplate.opsForList().range(key, 0, size - 1);

        redisTemplate.opsForList().trim(key, size, -1);

        if (jsons == null) return Collections.emptyList();

        return jsons.stream()
                .map(this::deserialize)
                .filter(Objects::nonNull)
                .toList();
    }

    private NotificationEvent deserialize(String json) {
        try {
            return objectMapper.readValue(json, NotificationEvent.class);
        } catch (Exception e) {
            log.error("[NotificationCacheRepo deserialize]: Ошибка десериализации: " + e.getMessage());
            return null;
        }
    }
}
