package com.matreshka.authservice.internal.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "jwt.secrets")
public record AuthProperties(
        String access,
        String refresh
) {
}