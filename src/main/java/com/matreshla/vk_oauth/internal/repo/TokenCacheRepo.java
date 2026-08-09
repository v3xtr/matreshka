package com.matreshla.vk_oauth.internal.repo;

import com.matreshla.vk_oauth.internal.repo.port.ITokenCacheRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TokenCacheRepo implements ITokenCacheRepo {

    private final StringRedisTemplate redisTemplate;

    public void saveToken(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

}
