package com.matreshka.authservice.delivery.http.dto;

public record LoginUserResponse(
    String id,
    String name,
    String phone,
    String email
) {
}
