package com.matreshka.chat_service.internal.infrastructure.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Getter
@Setter
public class MessageDocument {
    @Id
    private String id;
    @Indexed
    private String roomId;
    private String message;
    private String senderId;
    private LocalDateTime createdAt;
}