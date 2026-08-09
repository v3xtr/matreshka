package com.matreshka.chat_service.internal.configs;

import com.matreshka.chat_service.internal.components.JwtHandshakeInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtHandshakeInterceptor jwtHandshakeInterceptor;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat-websocket")
                .setAllowedOriginPatterns(
                        "http://localhost:*",
                        "https://localhost:*",
                        "http://85.198.96.229:*",
                        "https://85.198.96.229:*",
                        "http://xn--80aaouhzn4c.com",
                        "https://xn--80aaouhzn4c.com",
                        "http://www.xn--80aaouhzn4c.com",
                        "https://www.xn--80aaouhzn4c.com",
                        "http://матрешка.com",
                        "https://матрешка.com",
                        "http://www.матрешка.com",
                        "https://www.матрешка.com"
                )
                .addInterceptors(jwtHandshakeInterceptor)
                .withSockJS()
                .setClientLibraryUrl("https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js");
    }
}