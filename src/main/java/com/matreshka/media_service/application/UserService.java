package com.matreshka.media_service.application;

import com.matreshka.media_service.application.port.IUserService;
import com.matreshka.media_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.media_service.internal.infrastructure.persistence.mapper.UserMapper;
import com.matreshka.media_service.internal.repo.IUserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepo userRepo;
    private final UserMapper userMapper;

    @Transactional
    public UserEntity processUser(UserRegisteredEvent userRegisteredEvent){

        UserEntity user = userMapper.toEntity(userRegisteredEvent);

        return userRepo.save(user);
    }
}
