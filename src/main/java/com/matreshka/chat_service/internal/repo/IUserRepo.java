package com.matreshka.chat_service.internal.repo;

import com.matreshka.chat_service.internal.infrastructure.persistence.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends JpaRepository<UserEntity, String> {
}
