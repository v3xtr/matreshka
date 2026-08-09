package com.matreshka.chat_service.internal.infrastructure.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.UUID;

@Document(collection = "rooms")
@Getter
@Setter
public class RoomDocument {
    @Id
    private String id;
    private List<String> participants;

    @Field(name = "product_id")
    private UUID productId;

}