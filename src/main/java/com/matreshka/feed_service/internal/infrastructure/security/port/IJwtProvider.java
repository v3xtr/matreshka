package com.matreshka.feed_service.internal.infrastructure.security.port;

public interface IJwtProvider {
    boolean isValidToken(String token);
    String extractUserId(String token);

}
