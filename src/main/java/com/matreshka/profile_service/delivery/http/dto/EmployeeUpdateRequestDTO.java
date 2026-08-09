package com.matreshka.profile_service.delivery.http.dto;

import com.matreshka.profile_service.internal.infrastructure.persistence.ROLE;

public record EmployeeUpdateRequestDTO(
        String id,
        String name,
        ROLE role,
        String position
) {
}
