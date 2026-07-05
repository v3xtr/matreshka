package com.matreshka.chat_service.internal.configs;

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
                        .title("Chat Service API")
                        .version("1.0")
                        .description("""
                                    Сервис для Чата работает на Netty поэтому Socket.io на JS/TS не подойдет
                                
                                    ⚠️ Важно:
                                    Все запросы должны выполняться с `withCredentials: true`,
                                    чтобы передавались cookies.
                                """))
                .addServersItem(new Server().url("/"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("chat-service")
                .pathsToMatch("/**")
                .packagesToScan(
                        "com.matreshka.chat_service.delivery.http"
//                        "com.matreshka.chat_service.delivery.socket"
                )
                .build();
    }
}