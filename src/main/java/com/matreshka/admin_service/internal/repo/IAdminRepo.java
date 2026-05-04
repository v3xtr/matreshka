package com.matreshka.admin_service.internal.repo;

import com.matreshka.admin_service.internal.infrastructure.persistence.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IAdminRepo extends JpaRepository<AdminEntity, UUID> {
}
