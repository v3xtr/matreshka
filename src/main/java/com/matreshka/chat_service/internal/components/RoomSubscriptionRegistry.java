package com.matreshka.chat_service.internal.components;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class RoomSubscriptionRegistry {

    private final Map<String, Set<String>> roomSubscribers = new ConcurrentHashMap<>();

    private final Map<String, RoomUserPair> sessionToRoomUser = new ConcurrentHashMap<>();

    public void subscribe(String sessionId, String roomId, String userId) {
        roomSubscribers.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(userId);
        sessionToRoomUser.put(sessionId, new RoomUserPair(roomId, userId));
        log.debug("User {} subscribed to room {}", userId, roomId);
    }

    public void unsubscribeBySession(String sessionId) {
        RoomUserPair pair = sessionToRoomUser.remove(sessionId);
        if (pair != null) {
            Set<String> subscribers = roomSubscribers.get(pair.roomId());
            if (subscribers != null) {
                subscribers.remove(pair.userId());
                if (subscribers.isEmpty()) {
                    roomSubscribers.remove(pair.roomId());
                }
            }
            log.debug("User {} unsubscribed from room {}", pair.userId(), pair.roomId());
        }
    }

    public boolean isUserSubscribedToRoom(String roomId, String userId) {
        Set<String> subscribers = roomSubscribers.get(roomId);
        return subscribers != null && subscribers.contains(userId);
    }

    public void unsubscribeAllByUser(String userId) {
        roomSubscribers.forEach((roomId, subscribers) -> subscribers.remove(userId));
        sessionToRoomUser.entrySet().removeIf(entry -> entry.getValue().userId().equals(userId));
        log.debug("User {} disconnected, removed from all rooms", userId);
    }

    private record RoomUserPair(String roomId, String userId) {}
}