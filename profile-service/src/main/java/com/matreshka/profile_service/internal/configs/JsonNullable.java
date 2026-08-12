package com.matreshka.profile_service.internal.configs;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import tools.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = JsonNullableDeserializer.class)
public class JsonNullable<T> {
    private final T value;
    @Getter
    private final boolean present;

    private JsonNullable(T value, boolean present) {
        this.value = value;
        this.present = present;
    }

    @JsonCreator
    public static <T> JsonNullable<T> of(T value) {
        return new JsonNullable<>(value, true);
    }

    @Override
    public String toString() {
        return present ? String.valueOf(value) : "null";
    }

    public T get() { return value; }
}