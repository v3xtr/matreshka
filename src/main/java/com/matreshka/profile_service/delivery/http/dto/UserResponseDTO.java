package com.matreshka.profile_service.delivery.http.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.matreshka.profile_service.internal.infrastructure.persistence.ROLE;
import org.joda.time.LocalDateTime;

import java.util.List;

public record UserResponseDTO(
        String id,
        String email,
        String name,
        String phone,
        String description,
        String avatarUrl,
        @JsonProperty("city")
        String city,
        List<EmployeeResponseDTO> employees,
        List<ReviewResponseDTO> reviews,
        ROLE role,
        boolean editable,
        Integer rating,
        LocalDateTime createdAt
        ) { }