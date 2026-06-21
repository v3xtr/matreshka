package com.matreshka.feed_service.internal.configs;

import com.matreshka.feed_service.internal.repo.IVideoRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Set;
import java.util.UUID;
import java.util.function.BiConsumer;

@Configuration
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class Scheduler {

    private final StringRedisTemplate redisTemplate;
    private final IVideoRepo videoRepo;

    @Scheduled(fixedRate = 10000)
    @Transactional
    public void syncLikesToDb() {
        syncMetrics("likes:post:*", (videoId, delta) -> {
            if (delta != 0L) {
                videoRepo.incrementLikes(videoId, delta);
            }
        }, true);
    }

    @Scheduled(fixedRate = 10000)
    @Transactional
    public void syncViewsToDb() {
        syncMetrics("views:post:*", (videoId, delta) -> {
            if (delta > 0L) {
                videoRepo.incrementViews(videoId, delta);
            }
        }, false);
    }

    private void syncMetrics(String pattern, BiConsumer<UUID, Long> dbSyncer, boolean allowNegativeDelta) {
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys == null || keys.isEmpty()) return;

        log.debug("Found {} keys for pattern {}", keys.size(), pattern);

        for (String key : keys) {
            String[] parts = key.split(":");
            if (parts.length < 3) {
                continue;
            }

            String videoIdStr = parts[2];
            long delta = getDelta(key);

            boolean hasCondition = allowNegativeDelta ? (delta != 0L) : (delta > 0L);

            if (hasCondition) {
                try {
                    UUID videoId = UUID.fromString(videoIdStr);
                    dbSyncer.accept(videoId, delta);

                    String currentValue = redisTemplate.opsForValue().get(key);
                    if ("0".equals(currentValue)) {
                        redisTemplate.delete(key);
                    }
                } catch (IllegalArgumentException e) {
                    log.error("Invalid UUID in Redis key {}: {}", key, videoIdStr);
                } catch (Exception e) {
                    log.error("Failed to sync metric for key {}: {}", key, e.getMessage());
                }
            } else {
                redisTemplate.delete(key);
            }
        }
    }

    private long getDelta(String key) {
        String rawValue = redisTemplate.opsForValue().getAndSet(key, "0");
        if (rawValue == null) {
            return 0L;
        }
        try {
            return Long.parseLong(rawValue);
        } catch (NumberFormatException e) {
            return 0L;
        }
    }
}