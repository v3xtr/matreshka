package com.matreshka.profile_service.internal.repo;

import com.matreshka.profile_service.internal.infrastructure.persistence.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmployeeRepo extends JpaRepository<EmployeeEntity, Long> {

}
