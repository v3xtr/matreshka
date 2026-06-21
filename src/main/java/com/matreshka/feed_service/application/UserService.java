package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.IUserService;
import com.matreshka.feed_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.feed_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {

    private final IUserRepo userRepo;
    private final IUserMapper userMapper;

    @Override
    @Transactional
    public void processUser(UserRegisteredEvent event){
        UserEntity user = userMapper.toEntity(event);
        userRepo.save(user);
    }
}
