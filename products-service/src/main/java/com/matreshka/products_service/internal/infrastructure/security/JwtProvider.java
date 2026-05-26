package com.matreshka.products_service.internal.infrastructure.security;

import com.matreshka.products_service.internal.infrastructure.security.port.IJwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
@Slf4j
public class JwtProvider implements IJwtProvider {

    @Value("${jwt.access.token.secret}")
    private String accessTokenSecret;

    @Override
    public boolean isValidToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (Exception e) {
            log.error("[JwtProvider] Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public String extractUserId(String token) {
        try {
            Claims claims = parseClaims(token);
            return claims.get("userId", String.class);
        } catch (JwtException e) {
            log.error("[JwtProvider] Failed to extract userId: {}", e.getMessage());
            return null;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = accessTokenSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
