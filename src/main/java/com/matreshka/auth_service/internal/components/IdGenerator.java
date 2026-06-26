package com.matreshka.auth_service.internal.components;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class IdGenerator {

    private static final String CHARS = "0123456789";
    private static final int LENGTH = 12;
    private final Random random = new Random();

    public String generateId() {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < LENGTH; i++) {
            result.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return result.toString();
    }
}
