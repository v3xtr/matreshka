package com.matreshla.vk_oauth.internal.components;

import com.matreshla.vk_oauth.internal.configs.ApplicationJWTProperties;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JWTBuilder {

    private final ApplicationJWTProperties applicationJWTProperties;

    public Map<String, String> generateTokens(String id){
        Map<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", createToken(id, applicationJWTProperties.getAccessSecret(), 15 * 60 * 1000));
        tokens.put("refreshToken", createToken(id, applicationJWTProperties.getRefreshSecret(), 7 * 24 * 60 * 60 * 1000));

        return tokens;
    }

    public String createToken(String id, String secret, long expirationTime) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder()
                .subject(id)
                .claim("id", id)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime * 1000))
                .signWith(key)
                .compact();
    }
}
