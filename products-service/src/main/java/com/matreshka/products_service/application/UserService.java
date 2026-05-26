package com.matreshka.products_service.application;

import com.matreshka.products_service.application.port.IUserService;
import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IUserMapper;
import com.matreshka.products_service.internal.repo.IUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepo userRepo;
    private final IUserMapper userMapper;

    public void processUser(UserRegisteredEvent event) {
        UserEntity user = userMapper.toEntity(event);
        userRepo.save(user);
    }
}
