package com.matreshka.profile_service.delivery.http.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.matreshka.profile_service.internal.configs.JsonNullable;
import com.matreshka.profile_service.internal.infrastructure.persistence.ROLE;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserUpdateRequestDTO(
        JsonNullable<String> name,
        JsonNullable<String> address,
        JsonNullable<String> city,
        JsonNullable<String> description,
        JsonNullable<String> employeeName,
        JsonNullable<String> employeeRole,
        JsonNullable<String> type,
        JsonNullable<String> avatarUrl,
        JsonNullable<ROLE> role
) {
}