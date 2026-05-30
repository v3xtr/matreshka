package com.matreshka.products_service.internal.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomOpenApi {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Products Service API")
                        .version("1.0")
                        .description("""
                                    Сервис для работы с объявлениями (Products).
                                
                                    ⚠️ Важно:
                                    Все запросы должны выполняться с `withCredentials: true`,
                                    чтобы передавались cookies.
                                """))
                .addServersItem(new Server().url("/"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("products-service")
                .pathsToMatch("/**")
                .packagesToScan("com.matreshka.products_service.delivery.http")
                .build();
    }
}