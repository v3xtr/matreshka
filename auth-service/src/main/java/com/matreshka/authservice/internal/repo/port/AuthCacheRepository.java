package com.matreshka.authservice.internal.repo.port;

public interface AuthCacheRepository {
    void saveVerificationCode(String to, String code);
    String findVerificationCode(String to);
    void saveRefreshToken(String userId, String refreshToken);
}
