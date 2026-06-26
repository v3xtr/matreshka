package com.matreshka.auth_service.delivery.http.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterUserRequestDTO(
        @NotBlank(message = "Email не должен быть пустым")
        @Email(message = "Неверный формат Email")
        String email,

        @NotBlank(message = "Телефон не должен быть пустым")
        String phone,

        @NotBlank(message = "Имя не должно быть пустым")
        String name,

        @NotBlank(message = "Пароль не должен быть пустым")
        String password
) {}