package com.matreshka.authservice.delivery.http.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginUserRequest(
        @NotBlank(message = "Email не должен быть пустым")
        @Email(message = "Неверный формат Email")
        String login,

        @NotBlank(message = "Пароль не должен быть пустым")
        String password
) {}