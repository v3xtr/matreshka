package com.matreshka.chat_service.delivery.socket;

import com.matreshka.chat_service.application.port.IChatService;
import com.matreshka.chat_service.delivery.broker.BrokerProducer;
import com.matreshka.chat_service.delivery.broker.dto.NotificationEvent;
import com.matreshka.chat_service.delivery.http.dto.MessageResponseDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageRequestDTO;
import com.matreshka.chat_service.internal.components.RoomSubscriptionRegistry;
import com.matreshka.chat_service.internal.infrastructure.mapper.IChatMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatSocket {

    private final IChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final BrokerProducer brokerProducer;
    private final IChatMapper chatMapper;
    private final RoomSubscriptionRegistry subscriptionRegistry;

    @MessageMapping("/chat.sendMessage/{roomId}")
    public MessageResponseDTO sendMessage(@DestinationVariable String roomId,
                                          SendMessageRequestDTO message,
                                          SimpMessageHeaderAccessor headerAccessor) {

        String senderId = extractUserId(headerAccessor);

        NotificationEvent event = chatService.sendMessage(roomId, message, senderId);

        MessageResponseDTO messageResponse = chatMapper.toResponse(event);

        messagingTemplate.convertAndSend("/topic/room/" + roomId, event);

        boolean receiverInRoom = subscriptionRegistry.isUserSubscribedToRoom(roomId, event.receiverId());
        log.info("receiverId={}, roomId={}, receiverInRoom={}", event.receiverId(), roomId, receiverInRoom);

        if (!receiverInRoom) {
            brokerProducer.publishNotification(event);
        }

        return messageResponse;
    }

    @MessageMapping("/chat.enterRoom/{roomId}")
    public void enterRoom(@DestinationVariable String roomId, SimpMessageHeaderAccessor headerAccessor) {
        String userId = extractUserId(headerAccessor);

        subscriptionRegistry.subscribe(userId + ":" + roomId, roomId, userId);
        chatService.markMessagesAsRead(roomId, userId);
        messagingTemplate.convertAndSendToUser(userId, "/queue/room-entered", roomId);
    }

    @MessageMapping("/chat.leaveRoom/{roomId}")
    public void leaveRoom(@DestinationVariable String roomId, SimpMessageHeaderAccessor headerAccessor) {
        String userId = extractUserId(headerAccessor);

        subscriptionRegistry.unsubscribeBySession(userId + ":" + roomId);
    }

    private String extractUserId(SimpMessageHeaderAccessor headerAccessor) {
        String userId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("id");

        if (userId == null) {
            throw new RuntimeException("Unauthorized WebSocket connection");
        }

        return userId;
    }
}