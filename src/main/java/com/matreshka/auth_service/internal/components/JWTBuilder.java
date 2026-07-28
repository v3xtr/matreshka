package com.matreshka.auth_service.internal.components;

import com.matreshka.auth_service.internal.configs.AuthProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTBuilder {

    private final AuthProperties authProperties;

    public Map<String, String> generateTokens(String id) {
        Map<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", createToken(id, authProperties.access(), 15 * 60 * 1000L));
        tokens.put("refreshToken", createToken(id, authProperties.refresh(), 7L * 24 * 60 * 60 * 1000));

        return tokens;
    }

    public String createToken(String id, String secret, long expirationTimeMillis) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder()
                .subject(id)
                .claim("id", id)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTimeMillis))
                .signWith(key)
                .compact();
    }

    public String refreshAccessTokenByRefresh(String incomingRefreshToken) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(authProperties.refresh().getBytes()))
                    .build()
                    .parseSignedClaims(incomingRefreshToken)
                    .getPayload();

            String userId = claims.get("id", String.class);

            return createToken(userId, authProperties.access(), 15 * 60 * 1000L);

        } catch (JwtException e) {
            log.error("[JWT] Refresh token verification failed: {}", e.getMessage());
            throw new RuntimeException("Invalid refresh token");
        }
    }

    public String extractUserIdIgnoringExpiration(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSignKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.get("id", String.class);
        } catch (JwtException e) {
            log.error("[JWT] Failed to extract userId ignoring expiration: {}", e.getMessage());
            return null;
        }
    }

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(authProperties.access().getBytes());
    }
}