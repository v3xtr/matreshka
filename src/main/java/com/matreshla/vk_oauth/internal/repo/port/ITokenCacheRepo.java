package com.matreshla.vk_oauth.internal.repo.port;

public interface ITokenCacheRepo {
    void saveToken(String key, String value);
}
