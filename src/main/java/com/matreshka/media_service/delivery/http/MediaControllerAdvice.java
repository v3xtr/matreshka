package com.matreshka.media_service.delivery.http;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MediaControllerAdvice {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleInternalServerError(){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Внутряняя ошибка сервера");
    }
}
