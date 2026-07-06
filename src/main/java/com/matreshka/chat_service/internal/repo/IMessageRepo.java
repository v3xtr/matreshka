package com.matreshka.chat_service.internal.repo;

import com.matreshka.chat_service.internal.infrastructure.persistence.MessageDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface IMessageRepo extends MongoRepository<MessageDocument, String> {

    List<MessageDocument> findByRoomIdAndMessageContainingIgnoreCase(String roomId, String text);

    Optional<MessageDocument> findByIdAndRoomId(String id, String roomId);
}