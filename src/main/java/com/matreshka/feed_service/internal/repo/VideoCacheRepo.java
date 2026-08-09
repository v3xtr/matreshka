package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.repo.port.IVideoCacheRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class VideoCacheRepo implements IVideoCacheRepo {

    private final StringRedisTemplate redisTemplate;

    public void like(String videoId) {
        String key = "likes:post:" + videoId;
        redisTemplate.opsForValue().increment(key);
    }

    public void unlike(String videoId){
        String key = "likes:post:" + videoId;
        redisTemplate.opsForValue().decrement(key);
    }

    public void addView(String videoId, String userId){
        String key = "views:post:" + videoId + ":userId" + userId;
        redisTemplate.opsForValue().increment(key);
    }

    public long getDelta(String videoId){
        String key = "likes:post:" + videoId;
        String val = redisTemplate.opsForValue().get(key);

        if (val == null) {
            return 0L;
        }

        try {
            return Long.parseLong(val);
        } catch (NumberFormatException e) {
            return 0L;
        }
    }

    @Override
    public boolean hasViewed(String videoId, String userId) {
        String key = "video:view:" + videoId;

        return Boolean.TRUE.equals(
                redisTemplate.opsForSet().isMember(key, userId)
        );
    }
}