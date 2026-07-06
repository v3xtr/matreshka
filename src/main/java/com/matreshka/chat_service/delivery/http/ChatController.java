package com.matreshka.chat_service.delivery.http;

import com.matreshka.chat_service.application.port.IChatService;
import com.matreshka.chat_service.delivery.http.dto.CreateRoomRequestDTO;
import com.matreshka.chat_service.delivery.http.dto.MessageResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final IChatService chatService;

    @PostMapping("/create-room")
    public ResponseEntity<Void> createRoom(@Valid @RequestBody CreateRoomRequestDTO createRoomRequestDTO){
        chatService.createRoom(createRoomRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/user-rooms")
    public ResponseEntity<Void> getUserRooms(){
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Void> getRoom(@PathVariable Long roomId){
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/search-messages/{roomId}")
    public ResponseEntity<Void> searchMessages(
            @PathVariable Long roomId,
            @RequestParam String query
    ){
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/messages/{messageId}/read")
    public ResponseEntity<Void> setRead(@PathVariable String messageId, @RequestParam String roomId) {
        chatService.setRead(roomId, messageId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<MessageResponseDTO>> searchMessages(@RequestParam String roomId, @RequestParam String query) {
        return ResponseEntity.ok(chatService.searchMessages(roomId, query));
    }


}
