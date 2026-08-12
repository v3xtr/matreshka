package com.matreshka.media_service.delivery.http;

import com.matreshka.media_service.internal.infrastructure.exception.UnAuthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

@RestControllerAdvice
@Slf4j
public class MediaControllerAdvice {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleInternalServerError(Exception e) {
        log.error("Внутряняя ошибка сервера: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Внутряняя ошибка сервера");
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleBadRequestException(BadRequestException e) {
        log.error("Ошибка валидации: {}", Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<String> handleUnAuthorizedException(UnAuthorizedException e) {
        log.error("Ошибка авторизации: {}", Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}
