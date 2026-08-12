package com.matreshka.products_service.internal.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt.secrets")
public record AuthProperties(
        String access
) {
}