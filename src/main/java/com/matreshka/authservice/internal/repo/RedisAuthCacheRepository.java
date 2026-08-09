package com.matreshka.authservice.internal.repo;

import com.matreshka.authservice.internal.repo.port.AuthCacheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RedisAuthCacheRepository implements AuthCacheRepository {

    private final StringRedisTemplate redisTemplate;

    public void saveVerificationCode(String to, String code){
        redisTemplate.opsForValue().set(to, code);
    }

    public String findVerificationCode(String to){
        return redisTemplate.opsForValue().get(to);
    }

    public void saveRefreshToken(String userId, String refreshToken){
        String redisKey = String.format("refreshToken:%s", userId);

        if (refreshToken == null) {
            throw new RuntimeException("refreshToken must be provided");
        }
        redisTemplate.opsForValue().set(redisKey, refreshToken, 7, TimeUnit.DAYS);
    }

    public String findRefreshToken(String userId){
        String redisKey = String.format("refreshToken:%s", userId);
        return redisTemplate.opsForValue().get(redisKey);
    }
}
