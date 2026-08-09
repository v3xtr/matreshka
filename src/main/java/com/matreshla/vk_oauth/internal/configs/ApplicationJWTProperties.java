package com.matreshla.vk_oauth.internal.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@ConfigurationProperties(prefix = "jwt")
public class ApplicationJWTProperties {
    private String accessSecret;
    private String refreshSecret;
}
