package com.matreshka.media_service.application;

import com.matreshka.media_service.application.port.IUserService;
import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.mapper.UserMapper;
import com.matreshka.media_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {
    private final IUserRepo userRepo;
    private final UserMapper userMapper;

    @Transactional
    public UserEntity processUser(String id) {
        log.info("processing user registered event, {}", id);
        UserEntity entity = new UserEntity();
        entity.setId(id);
        return userRepo.save(entity);
    }
}
