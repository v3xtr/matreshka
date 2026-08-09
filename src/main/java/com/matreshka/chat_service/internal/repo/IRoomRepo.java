package com.matreshka.chat_service.internal.repo;

import com.matreshka.chat_service.internal.infrastructure.persistence.RoomDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IRoomRepo extends MongoRepository<RoomDocument, String> {
    List<RoomDocument> findByParticipantsContains(String userId);
}