package com.matreshka.chat_service.application.port;

import com.matreshka.chat_service.delivery.http.dto.CreateRoomRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.SendMessageResponseDTO;

public interface IChatService {
    String createRoom(CreateRoomRequestDTO createRoomRequestDTO);
    SendMessageResponseDTO sendMessage(String roomId, SendMessageRequestDTO Message);

}
