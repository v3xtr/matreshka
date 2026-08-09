package com.matreshka.products_service.internal.infrastructure;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
