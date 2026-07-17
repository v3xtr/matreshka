package com.matreshka.auth_service.internal.repo;

import com.matreshka.auth_service.internal.repo.port.ICacheRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CacheRepo implements ICacheRepo {

    private final StringRedisTemplate redisTemplate;

    public void saveCode(String to, String code){
        redisTemplate.opsForValue().set(to, code);
    }

    public String getCode(String to){
        return redisTemplate.opsForValue().get(to);
    }

}
