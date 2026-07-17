package com.matreshka.auth_service.internal.components;


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

    private final String accessSecret;
    private final String refreshSecret;

    public JWTBuilder(@Value("${jwt.access.secret}") String accessSecret, @Value("${jwt.refresh.secret}") String refreshSecret) {
        this.accessSecret = accessSecret;
        this.refreshSecret = refreshSecret;
    }

    public Map<String, String> generateTokens(String id){
        Map<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", createToken(id, accessSecret, 15 * 60 * 1000));
        tokens.put("refreshToken", createToken(id, refreshSecret, 7 * 24 * 60 * 60 * 1000));

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

    public SecretKey verifyRefresh(){
            return Keys.hmacShaKeyFor(refreshSecret.getBytes());
    }
}
