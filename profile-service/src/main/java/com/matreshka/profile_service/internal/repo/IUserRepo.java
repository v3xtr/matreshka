package com.matreshka.profile_service.internal.repo;

import com.matreshka.profile_service.internal.infrastructure.persistence.UserEntity;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;

@Repository
public interface IUserRepo extends JpaRepository<UserEntity, String> {

    @EntityGraph(attributePaths = {"employeeEntities"})
    Optional<UserEntity> findWithEmployeesById(String id);

    @NonNull
    Optional<UserEntity> findById(@NonNull String userId);
}