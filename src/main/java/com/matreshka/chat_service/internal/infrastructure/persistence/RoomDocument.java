package com.matreshka.chat_service.internal.infrastructure.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "rooms")
@Getter
@Setter
public class RoomDocument {
    @Id
    private String id;
    private List<String> participants;
}