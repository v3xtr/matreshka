package com.matreshka.feed_service.internal.configs;

import com.matreshka.feed_service.internal.repo.IVideoRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Set;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class Scheduler {

    private final RedisTemplate<Object, Object> redisTemplate;
    private final IVideoRepo videoRepo;

    @Scheduled(fixedRate = 10000)
    @Transactional
    public void syncLikesToDb() {
        Set<Object> keys = redisTemplate.keys("likes:post:*");
        if (keys == null || keys.isEmpty()) return;

        for (Object key : keys) {
            String[] parts = key.toString().split(":");
            if (parts.length < 3) continue;

            String videoIdStr = parts[2];

            Object rawValue = redisTemplate.opsForValue().getAndSet(key, 0L);

            long delta = (rawValue instanceof Number n) ? n.longValue() : 0L;

            if (delta != 0L) {
                try {
                    UUID videoId = UUID.fromString(videoIdStr);
                    videoRepo.incrementLikes(videoId, delta);
                } catch (IllegalArgumentException e) {
                    log.error("Invalid UUID in Redis key: {}", videoIdStr);
                } catch (Exception e) {
                    log.error("Failed to sync likes for video {}: {}", videoIdStr, e.getMessage());
                }
            }
        }
    }
}