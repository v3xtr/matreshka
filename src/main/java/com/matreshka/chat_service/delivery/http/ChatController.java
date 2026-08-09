package com.matreshka.chat_service.delivery.http;

import com.matreshka.chat_service.application.port.IChatService;
import com.matreshka.chat_service.delivery.http.dto.CreateRoomRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.MessageResponseDTO;
import com.matreshka.chat_service.delivery.http.dto.RoomResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final IChatService chatService;

    @PostMapping("/get-or-create-room")
    public ResponseEntity<String> createRoom(@Valid @RequestBody CreateRoomRequestDTO createRoomRequestDTO){
        String response = chatService.getOrCreateRoom(createRoomRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/user-rooms")
    public ResponseEntity<List<RoomResponseDTO>> getUserRooms(
            @AuthenticationPrincipal String userId
    ){
        List<RoomResponseDTO> response = chatService.getUserRooms(userId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<RoomResponseDTO> getRoom(@PathVariable String roomId){
        RoomResponseDTO room = chatService.getRoom(roomId);
        return ResponseEntity.status(HttpStatus.OK).body(room);
    }

    @GetMapping("/search-messages/{roomId}")
    public ResponseEntity<List<MessageResponseDTO>> searchMessages(
            @PathVariable String roomId,
            @RequestParam String query
    ){
        List<MessageResponseDTO> messages = chatService.searchMessages(roomId, query);
        return ResponseEntity.status(HttpStatus.OK).body(messages);
    }

    @PatchMapping("/messages/{messageId}/read")
    public ResponseEntity<Void> setRead(@PathVariable String messageId, @RequestParam String roomId) {
        chatService.setRead(roomId, messageId);
        return ResponseEntity.ok().build();
    }
}
