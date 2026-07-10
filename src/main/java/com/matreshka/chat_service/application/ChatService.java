package com.matreshka.chat_service.application;

import com.matreshka.chat_service.application.port.IChatService;
import com.matreshka.chat_service.delivery.http.dto.*;
import com.matreshka.chat_service.internal.infrastructure.mapper.IChatMapper;
import com.matreshka.chat_service.internal.infrastructure.persistence.*;
import com.matreshka.chat_service.internal.repo.IMessageRepo;
import com.matreshka.chat_service.internal.repo.IRoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ChatService implements IChatService {

    private final IMessageRepo messageRepository;
    private final IRoomRepo roomRepository;
    private final IChatMapper chatMapper;

    public void createRoom(CreateRoomRequestDTO createRoomRequestDTO) {
        String roomId = Stream.of(createRoomRequestDTO.userA(), createRoomRequestDTO.userB()).sorted().collect(Collectors.joining(":"));


        if (!roomRepository.existsById(roomId)) {
            RoomDocument room = new RoomDocument();
            room.setId(roomId);
            room.setParticipants(List.of(createRoomRequestDTO.userA(), createRoomRequestDTO.userB()));
            roomRepository.save(room);
        }else{
            throw new RuntimeException("Room already exists");
        }

    }

    public SendMessageResponseDTO sendMessage(String roomId, SendMessageRequestDTO messageDto) {
        MessageDocument message = chatMapper.toDocument(messageDto);
        message.setRoomId(roomId);
        message.setCreatedAt(LocalDateTime.now());
        messageRepository.save(message);
        return new SendMessageResponseDTO();
    }

    @Override
    public void setRead(String roomId, String messageId) {

        MessageDocument message = messageRepository
                .findByIdAndRoomId(messageId, roomId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        message.setIsRead(true);

        messageRepository.save(message);
    }

    public List<MessageResponseDTO> searchMessages(String roomId, String query) {
        return messageRepository.findByRoomIdAndMessageContainingIgnoreCase(roomId, query)
                .stream()
                .map(chatMapper::toResponse)
                .toList();
    }
}