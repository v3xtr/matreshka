package com.matreshka.chat_service.internal.middleware;

import com.matreshka.chat_service.internal.infrastructure.security.port.IJwtProvider;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthFilter extends OncePerRequestFilter {

    private final IJwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        log.info("[AuthFilter] Incoming path: {}", path);

        if (path.contains("/api-docs") ||
                path.contains("/v3/api-docs") ||
                path.contains("/swagger-ui") ||
                path.contains("/webjars") ||
                path.equals("/favicon.ico")) {

            log.debug("[AuthFilter] Skipping auth for swagger/docs path: {}", path);
            filterChain.doFilter(request, response);
            return;
        }

        String token = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            log.info("[AuthFilter] Cookies received: {}", cookies.length);
            for (Cookie c : cookies) {
                log.info("[AuthFilter] Cookie: name='{}', value='{}'", c.getName(), c.getValue());
                if ("access_token".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        } else {
            log.warn("[AuthFilter] No cookies at all");
        }

        if (token != null && jwtProvider.isValidToken(token)) {
            String userId = jwtProvider.extractUserId(token);
            log.info("[AuthFilter] Token valid for user {} at {}", userId, path);

            var auth = new UsernamePasswordAuthenticationToken(
                    userId,
                    null,
                    Collections.emptyList()
            );

            SecurityContextHolder.getContext().setAuthentication(auth);
            filterChain.doFilter(request, response);
        } else {
            log.warn("[AuthFilter] No valid token for {}, token={}", path, token);
            filterChain.doFilter(request, response);
        }
    }
}