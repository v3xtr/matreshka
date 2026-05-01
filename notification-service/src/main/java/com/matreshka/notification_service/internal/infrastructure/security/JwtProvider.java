package com.matreshka.notification_service.internal.infrastructure.security;

import com.matreshka.notification_service.internal.infrastructure.security.port.IJwtProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
@Slf4j
public class JwtProvider implements IJwtProvider {

    @Value("${jwt.access.token.secret}")
    private String accessTokenSecret;

    public boolean isValidToken(String token){
        if(token == null || token.trim().isEmpty()){
            return false;
        }

        try{
            Jwts.parser()
                    .verifyWith(getSignKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        }catch (IllegalArgumentException e){
            log.error("[JwtProvider isValid] Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    public String extractUserId(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSignKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (Exception e) {
            log.error("[JwtProvider extractUserId] Failed to extract userId: {}", e.getMessage());
            return null;
        }
    }

    private SecretKey getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(accessTokenSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
