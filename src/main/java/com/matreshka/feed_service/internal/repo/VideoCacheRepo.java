package com.matreshka.feed_service.internal.repo;

import com.matreshka.feed_service.internal.repo.port.IVideoCacheRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class VideoCacheRepo implements IVideoCacheRepo {

    private final RedisTemplate<String, String> redisTemplate;

    public void like(String videoId) {
        String key = "likes:post"+videoId;
        redisTemplate.opsForValue().increment(key);
    }

    public void unlike(String videoId){
        String key = "likes:post"+videoId;
        redisTemplate.opsForValue().decrement(key);
    }

    public long getDelta(String videoId){
        String key = "likes:post"+videoId;
        Object val =  redisTemplate.opsForValue().get(key);

        if(val == null){
            return 0L;
        }

        try {
            return Long.parseLong(val.toString());
        } catch (NumberFormatException e) {
            return 0L;
        }
    }
}
