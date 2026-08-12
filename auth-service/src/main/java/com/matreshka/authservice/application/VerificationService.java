package com.matreshka.authservice.application;

import com.matreshka.authservice.application.port.VerificationUseCase;
import com.matreshka.authservice.internal.repo.RedisAuthCacheRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VerificationService implements VerificationUseCase {

    private final RedisAuthCacheRepository authCacheRepository;

    @Override
    public boolean verifyCode(String to, String code){
        log.info("verifyCode called with to={}, code={}", to, code);
        String cacheCode = authCacheRepository.findVerificationCode(to);

        if(code == null){
            return false;
        }

        return code.equals(cacheCode);
    }
}
