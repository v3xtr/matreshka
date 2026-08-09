package com.matreshla.vk_oauth.internal.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@ConfigurationProperties(prefix = "vk.oauth")
public class ApplicationVkPropeties {
    private String clientId;
    private String clientSecret;
    private String redirectUri;

}
