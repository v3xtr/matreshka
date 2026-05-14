package com.matreshka.media_service.internal.repo;

import com.matreshka.media_service.internal.infrastructure.persistence.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends JpaRepository<UserEntity, String>{  }