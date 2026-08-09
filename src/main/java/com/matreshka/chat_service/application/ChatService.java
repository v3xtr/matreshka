package com.matreshka.chat_service.application;

import com.matreshka.chat_service.application.port.IChatService;
import com.matreshka.chat_service.delivery.broker.dto.NotificationEvent;
import com.matreshka.chat_service.delivery.http.dto.*;
import com.matreshka.chat_service.internal.exceptions.ConflictException;
import com.matreshka.chat_service.internal.infrastructure.mapper.IChatMapper;
import com.matreshka.chat_service.internal.infrastructure.mapper.IRoomMapper;
import com.matreshka.chat_service.internal.infrastructure.persistence.*;
import com.matreshka.chat_service.internal.repo.IMessageRepo;
import com.matreshka.chat_service.internal.repo.IRoomRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService implements IChatService {

    private final IMessageRepo messageRepository;
    private final IRoomRepo roomRepository;
    private final IChatMapper chatMapper;
    private final IRoomMapper roomMapper;

    @Override
    public String getOrCreateRoom(CreateRoomRequestDTO request) {
        if (request.userA().equals(request.userB())) {
            throw new ConflictException("Нельзя создать комнату с самим собой");
        }

        String roomId = Stream.of(request.userA(), request.userB())
                .sorted()
                .collect(Collectors.joining(":"));

        return roomRepository.findById(roomId)
                .map(RoomDocument::getId)
                .orElseGet(() -> {
                    RoomDocument room = new RoomDocument();
                    room.setId(roomId);
                    room.setParticipants(List.of(request.userA(), request.userB()));
                    room.setProductId(UUID.fromString(request.productId()));
                    return roomRepository.save(room).getId();
                });
    }

    @Override
    public RoomResponseDTO getRoom(String roomId) {
        return roomRepository.findById(roomId)
                .map(roomMapper::toResponse)
                .orElse(null);
    }

    @Override
    public NotificationEvent sendMessage(String roomId, SendMessageRequestDTO messageDto, String senderId) {
        MessageDocument message = chatMapper.toDocument(messageDto);
        message.setRoomId(roomId);
        message.setSenderId(senderId);
        message.setCreatedAt(LocalDateTime.now());
        messageRepository.save(message);

        String receiverId = getReceiverId(roomId, senderId);

        return new NotificationEvent(
                message.getId(),
                senderId,
                receiverId,
                roomId,
                message.getMessage(),
                false,
                message.getCreatedAt()
        );
    }

    @Override
    public void setRead(String roomId, String messageId) {

        MessageDocument message = messageRepository
                .findByIdAndRoomId(messageId, roomId)
                .orElseThrow(() -> new RuntimeException("Сообщение не найдено"));

        message.setIsRead(true);

        messageRepository.save(message);
    }

    @Override
    public List<MessageResponseDTO> searchMessages(String roomId, String query) {
        return messageRepository.findByRoomIdAndMessageContainingIgnoreCase(roomId, query)
                .stream()
                .map(chatMapper::toResponse)
                .toList();
    }

    @Override
    public String getReceiverId(String roomId, String senderId) {
        String normalizedRoomId = normalizeRoomId(roomId);
        log.info("Looking for room with id: '{}'", normalizedRoomId);
        return roomRepository.findById(normalizedRoomId)
                .map(room -> room.getParticipants().stream()
                        .filter(id -> !id.equals(senderId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Второй участник не найден")))
                .orElseThrow(() -> new RuntimeException("Комната не найдена"));
    }

    private String normalizeRoomId(String roomId) {
        String[] parts = roomId.split(":");

        if (parts.length != 2) {
            return roomId;
        }
        return Stream.of(parts)
                .sorted()
                .collect(Collectors.joining(":"));
    }

    @Override
    public List<RoomResponseDTO> getUserRooms(String userId) {
        return roomRepository.findByParticipantsContains(userId)
                .stream()
                .map(roomMapper::toResponse)
                .toList();
    }

    @Override
    public void markMessagesAsRead(String roomId, String userId) {
        String normalizedRoomId = normalizeRoomId(roomId);

        List<MessageDocument> unreadMessages = messageRepository
                .findByRoomIdAndSenderIdNotAndIsReadFalse(normalizedRoomId, userId);

        unreadMessages.forEach(msg -> msg.setIsRead(true));

        messageRepository.saveAll(unreadMessages);
    }
}