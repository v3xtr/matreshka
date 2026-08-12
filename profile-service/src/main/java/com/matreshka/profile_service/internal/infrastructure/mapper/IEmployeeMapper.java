package com.matreshka.profile_service.internal.infrastructure.mapper;

import com.matreshka.profile_service.delivery.http.dto.EmployeeRequestDTO;
import com.matreshka.profile_service.delivery.http.dto.EmployeeResponseDTO;
import com.matreshka.profile_service.delivery.http.dto.EmployeeUpdateRequestDTO;
import com.matreshka.profile_service.internal.infrastructure.persistence.EmployeeEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IEmployeeMapper {

    @Mapping(target = "userEntity", ignore = true)
    @Mapping(target = "id", ignore = true)
    EmployeeEntity toEntity(EmployeeRequestDTO dto);

    @Mapping(target = "userEntity", ignore = true)
    void toEntity(EmployeeUpdateRequestDTO dto, @MappingTarget EmployeeEntity employeeEntity);

    EmployeeResponseDTO toResponseDTO(EmployeeEntity entity);
}

