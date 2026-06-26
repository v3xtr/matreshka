package com.matreshka.auth_service.internal.repo;

import com.matreshka.auth_service.internal.infrastructure.persistence.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepo extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findUserByEmail(String email);
    Optional<UserEntity> findUserByPhone(String phone);
}