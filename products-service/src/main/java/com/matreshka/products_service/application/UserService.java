package com.matreshka.products_service.application;

import com.matreshka.products_service.application.port.IUserService;
import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IUserMapper;
import com.matreshka.products_service.internal.repo.IUserRepo;
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
    public void processUser(UserRegisteredEvent event) {
        try{
            UserEntity user = userMapper.toEntity(event);
            userRepo.save(user);
        }catch (Exception e){
            log.error("Error processing user event", e);
        }
    }
}
