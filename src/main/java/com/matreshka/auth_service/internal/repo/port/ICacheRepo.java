package com.matreshka.auth_service.internal.repo.port;

public interface ICacheRepo {
    void saveCode(String to, String code);
    String getCode(String to);
    void saveToken(String userId, String refreshToken);
}
