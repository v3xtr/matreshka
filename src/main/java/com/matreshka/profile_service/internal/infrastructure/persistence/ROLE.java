package com.matreshka.profile_service.internal.infrastructure.persistence;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ROLE {
    PRIVATE_PERSON,
    COMPANY
}
