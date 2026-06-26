package com.matreshka.auth_service.application;

import com.matreshka.auth_service.application.port.IVerificationService;
import com.matreshka.auth_service.internal.repo.port.ICacheRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VerificationService implements IVerificationService {

    private final ICacheRepo cacheRepo;

    public boolean verifyCode(String to, String code){
        log.info("verifyCode called with to={}, code={}", to, code);
        String cacheCode = cacheRepo.getCode(to);

        if(code == null){
            return false;
        }

        return code.equals(cacheCode);
    }
}
