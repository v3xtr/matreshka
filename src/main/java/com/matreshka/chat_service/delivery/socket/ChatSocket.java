package com.matreshka.chat_service.delivery.socket;

import com.matreshka.chat_service.application.port.IChatService;
import com.matreshka.chat_service.delivery.http.dto.SendMessageRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatSocket {

    private final IChatService chatService;

    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public SendMessageResponseDTO sendMessage(@DestinationVariable String roomId, SendMessageRequestDTO message) {
        return chatService.sendMessage(roomId, message);
    }
}
