package com.matreshka.chat_service.application;

import com.matreshka.chat_service.application.port.IUserService;
import com.matreshka.chat_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.chat_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.chat_service.internal.infrastructure.persistence.MessageDocument;
import com.matreshka.chat_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.chat_service.internal.repo.IMessageRepo;
import com.matreshka.chat_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepo userRepo;
    private final IUserMapper userMapper;
    private final IMessageRepo chatRepo;

    @Override
    @Transactional
    public void processUser(UserRegisteredEvent userEvent){

        UserEntity userEntity = userMapper.toEntity(userEvent);

        MessageDocument chatDocument = userMapper.toDocument(userEvent);

        chatRepo.save(chatDocument);

        userRepo.save(userEntity);
    }
}
