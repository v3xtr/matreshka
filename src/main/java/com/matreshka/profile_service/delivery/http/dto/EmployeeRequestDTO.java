package com.matreshka.profile_service.delivery.http.dto;

import com.matreshka.profile_service.internal.infrastructure.persistence.ROLE;

public record EmployeeRequestDTO(
        String name,
        ROLE role,
        String position
) {
}
