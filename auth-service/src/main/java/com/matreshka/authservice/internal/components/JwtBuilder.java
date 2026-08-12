package com.matreshka.authservice.internal.components;

import com.matreshka.authservice.internal.configs.AuthProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtBuilder {

    private static final long ACCESS_TOKEN_TTL_MILLIS = 15 * 60 * 1000L;
    private static final long REFRESH_TOKEN_TTL_MILLIS = 7L * 24 * 60 * 60 * 1000L;
    private static final String USER_ID_CLAIM = "id";

    private final AuthProperties authProperties;

    public Map<String, String> generateTokens(String id) {
        return Map.of(
                "accessToken", createToken(id, authProperties.access(), ACCESS_TOKEN_TTL_MILLIS),
                "refreshToken", createToken(id, authProperties.refresh(), REFRESH_TOKEN_TTL_MILLIS)
        );
    }

    public String createToken(String id, String secret, long expirationTimeMillis) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder()
                .subject(id)
                .claim(USER_ID_CLAIM, id)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTimeMillis))
                .signWith(key)
                .compact();
    }

    public String refreshAccessTokenByRefresh(String incomingRefreshToken) {
        try {
            Claims claims = parseClaims(incomingRefreshToken, authProperties.refresh());
            String userId = extractUserId(claims);
            return createToken(userId, authProperties.access(), ACCESS_TOKEN_TTL_MILLIS);
        } catch (JwtException e) {
            log.error("[JWT] Refresh token verification failed: {}", e.getMessage());
            throw new RuntimeException("Invalid refresh token");
        }
    }

    public String extractUserIdIgnoringExpiration(String token) {
        try {
            Claims claims = parseClaims(token, authProperties.access());
            return extractUserId(claims);
        } catch (ExpiredJwtException e) {
            return extractUserId(e.getClaims());
        } catch (JwtException e) {
            log.error("[JWT] Failed to extract userId: {}", e.getMessage());
            return null;
        }
    }

    private Claims parseClaims(String token, String secret) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private String extractUserId(Claims claims) {
        return claims.get(USER_ID_CLAIM, String.class);
    }
}