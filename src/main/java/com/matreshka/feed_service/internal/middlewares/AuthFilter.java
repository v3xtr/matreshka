package com.matreshka.feed_service.internal.middlewares;

import com.matreshka.feed_service.internal.infrastructure.security.port.IJwtProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;


@RequiredArgsConstructor
@Component
@Slf4j
public class AuthFilter extends OncePerRequestFilter {

    private final IJwtProvider jwtProvider;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.contains("/swagger-ui") ||
                path.contains("/api-docs") ||
                path.contains("/v3/api-docs") ||
                path.contains("/webjars") ||
                path.contains("/swagger-resources") ||
                path.contains("/actuator") ||
                path.equals("/favicon.ico") ||
                path.equals("/error");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        log.info("[AuthFilter] Incoming path: {}", path);

        String token = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("access_token".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        } else {
            log.warn("[AuthFilter] No cookies at all for path: {}", path);
        }

        if (token != null && jwtProvider.isValidToken(token)) {
            String userId = jwtProvider.extractUserId(token);
            log.info("[AuthFilter] Token valid for user {} at {}", userId, path);

            var auth = new UsernamePasswordAuthenticationToken(
                    userId, null, Collections.emptyList()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        } else {
            log.warn("[AuthFilter] No valid token for path: {}", path);
        }

        filterChain.doFilter(request, response);
    }
}