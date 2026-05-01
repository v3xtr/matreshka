package com.matreshka.notification_service.internal.middleware;

import com.matreshka.notification_service.internal.infrastructure.security.port.IJwtProvider;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@WebFilter(filterName = "AuthMiddleware", urlPatterns = "/api/**")
@Component
@RequiredArgsConstructor
@Slf4j
public class AuthMiddleware implements Filter {

    private final IJwtProvider jwtProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        jakarta.servlet.http.Cookie[] cookies = httpRequest.getCookies();
        String token = null;

        log.info("[AuthMiddleware] Request URL: {}", httpRequest.getRequestURL());

        String path = ((HttpServletRequest) request).getRequestURI();
        if (path.contains("/swagger-ui") || path.contains("/api-docs") || path.contains("/v3/api-docs")) {
            chain.doFilter(request, response);
            return;
        }

        if (cookies != null) {
            for (jakarta.servlet.http.Cookie c : cookies) {
                log.info("[AuthMiddleware] Found Cookie: {} = {}", c.getName(), c.getValue());
                if ("access_token".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        } else {
            log.warn("[AuthMiddleware] No cookies at all in the request!");
        }

        if (token != null && jwtProvider.isValidToken(token)) {
            String userId = jwtProvider.extractUserId(token);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userId,
                    null,
                    java.util.Collections.emptyList()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        } else {
            log.warn("[AuthMiddleware] Access token missing or invalid");
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Auth cookie missing");
        }
    }
}
