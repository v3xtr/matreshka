package com.matreshka.authservice.delivery.http.dto;

public record RegisterUserResponse(
    String id,
    String name,
    String phone,
    String email
) {
}
