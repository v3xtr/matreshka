package com.matreshka.feed_service.internal.middlewares;

import com.matreshka.feed_service.internal.infrastructure.security.port.IJwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
@Slf4j
public class AuthMiddleware implements Filter {

    private final IJwtProvider jwtProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String path = httpRequest.getRequestURI();

        if (path.contains("/swagger-ui") || path.contains("/v3/api-docs") || path.contains("/api/media/public")) {
            chain.doFilter(request, response);
            return;
        }

        jakarta.servlet.http.Cookie[] cookies = httpRequest.getCookies();
        String token = null;
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie c : cookies) {
                if ("access_token".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        }

        if (token != null && jwtProvider.isValidToken(token)) {
            log.info("[AuthMiddleware] Token valid for {}", path);

            var auth = new UsernamePasswordAuthenticationToken(
                    jwtProvider.isValidToken(token), null, java.util.Collections.emptyList()
            );
            org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(auth);

            chain.doFilter(request, response);
        } else {
            log.warn("[AuthMiddleware] Auth failed for {}. Sending 401...", path);

            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.getWriter().write("Token expired or missing. Please refresh.");
        }
    }
}