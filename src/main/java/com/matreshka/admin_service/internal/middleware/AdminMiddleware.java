package com.matreshka.admin_service.internal.middleware;


import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@WebFilter(filterName = "AdminMiddleware")
@RequiredArgsConstructor
@Slf4j
public class AdminMiddleware implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws Exception {

    }
}
