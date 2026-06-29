package com.matreshka.auth_service.internal.components;

import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTBuilder {

    @Value("${jwt.access.secret}")
    private String accessSecret;

    @Value("${jwt.refresh.secret}")
    private String refreshSecret;

    public Map<String, String> generateTokens(String id){
        Map<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", createToken(id, accessSecret, 15 * 60 * 1000));
        tokens.put("refreshToken", createToken(id, refreshSecret, 7 * 24 * 60 * 60 * 1000));

        return tokens;
    }

    private String createToken(String id, String secret, long expirationTime) {
        byte[] keyBytes = java.util.Base64.getDecoder().decode(secret);
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .subject(id)
                .claim("id", id)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime * 1000))
                .signWith(key)
                .compact();
    }
}
