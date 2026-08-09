package com.matreshka.profile_service.internal.configs;

import io.swagger.v3.core.converter.AnnotatedType;
import io.swagger.v3.core.converter.ModelConverter;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Iterator;

@Configuration
public class CustomOpenApi {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Profile Service API")
                        .version("1.0")
                        .description("""
                                    Сервис для работы с объявлениями (Profile).
                                
                                    ⚠️ Важно:
                                    Все запросы должны выполняться с `withCredentials: true`,
                                    чтобы передавались cookies.
                                """))
                .addServersItem(new Server().url("/"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("profile-service")
                .pathsToMatch("/api/profile/**")
                .build();
    }

    @Bean
    public ModelConverter jsonNullableConverter() {
        return (type, context, chain) -> {
            if (type.getType().getTypeName().contains("JsonNullable")) {
                AnnotatedType innerType = new AnnotatedType(type.getType()).resolveAsRef(false);
                return context.resolve(innerType);
            }
            return chain.next().resolve(type, context, chain);
        };
    }
}