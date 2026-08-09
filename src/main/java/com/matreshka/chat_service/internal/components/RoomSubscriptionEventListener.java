package com.matreshka.chat_service.internal.components;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.security.Principal;

@Component
@RequiredArgsConstructor
@Slf4j
public class RoomSubscriptionEventListener {

    private final RoomSubscriptionRegistry subscriptionRegistry;

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String destination = accessor.getDestination();
        String sessionId = accessor.getSessionId();
        Principal principal = accessor.getUser();

        if (destination == null || principal == null) {
            return;
        }

        String roomId = extractRoomId(destination);
        if (roomId != null) {
            subscriptionRegistry.subscribe(sessionId, roomId, principal.getName());
        }
    }

    @EventListener
    public void handleUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        subscriptionRegistry.unsubscribeBySession(accessor.getSessionId());
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String userId = accessor.getSessionAttributes() != null
                ? (String) accessor.getSessionAttributes().get("id")
                : null;

        log.info("Disconnect event, sessionId={}, userId={}", accessor.getSessionId(), userId);
        subscriptionRegistry.unsubscribeBySession(accessor.getSessionId());

        if (userId != null) {
            subscriptionRegistry.unsubscribeAllByUser(userId);
        }
    }

    private String extractRoomId(String destination) {
        String prefix = "/topic/room/";
        if (destination.startsWith(prefix)) {
            return destination.substring(prefix.length());
        }
        return null;
    }
}