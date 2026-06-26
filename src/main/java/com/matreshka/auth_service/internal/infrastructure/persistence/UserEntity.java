package com.matreshka.auth_service.internal.infrastructure.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Table(name = "users")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    private String id;

    @Column(unique = true)
    private String email;

    private char[] password;

    private String name;

    private String phone;

    private String description = "";
}
