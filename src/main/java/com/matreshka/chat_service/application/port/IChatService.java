package com.matreshka.chat_service.application.port;

import com.matreshka.chat_service.delivery.http.dto.CreateRoomRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.MessageResponseDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageResponseDTO;

import java.util.List;

public interface IChatService {
    void createRoom(CreateRoomRequestDTO createRoomRequestDTO);
    SendMessageResponseDTO sendMessage(String roomId, SendMessageRequestDTO Message);
    void setRead(String roomId, String messageId);
    List<MessageResponseDTO> searchMessages(String roomId, String query);

}
