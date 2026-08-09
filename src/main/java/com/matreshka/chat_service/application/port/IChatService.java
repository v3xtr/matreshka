package com.matreshka.chat_service.application.port;

import com.matreshka.chat_service.delivery.broker.dto.NotificationEvent;
import com.matreshka.chat_service.delivery.http.dto.*;

import java.util.List;

public interface IChatService {
    String getOrCreateRoom(CreateRoomRequestDTO request);
    NotificationEvent sendMessage(String roomId, SendMessageRequestDTO Message, String senderId);
    void setRead(String roomId, String messageId);
    List<MessageResponseDTO> searchMessages(String roomId, String query);
    String getReceiverId(String roomId, String senderId);
    RoomResponseDTO getRoom(String roomId);
    List<RoomResponseDTO> getUserRooms(String userId);
    void markMessagesAsRead(String roomId, String userId);
}
