package com.matreshka.authservice.delivery.http;

import com.matreshka.authservice.delivery.http.dto.ErrorResponse;
import com.matreshka.authservice.internal.exceptions.ConflictException;
import com.matreshka.authservice.internal.exceptions.UnauthorizedException;
import com.matreshka.authservice.internal.exceptions.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AuthControllerAdvice {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException e) {
        log.error("Bad request exception: {}", e.getMessage());

        ErrorResponse error = new ErrorResponse(e.getMessage(), "BAD_REQUEST");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e) {
        log.error("User not found exception: {}", e.getMessage());

        ErrorResponse error = new ErrorResponse(e.getMessage(), "USER_NOT_FOUND");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflictException(ConflictException e) {
        log.error("Conflict exception: {}", e.getMessage());

        ErrorResponse error = new ErrorResponse(e.getMessage(), "CONFLICT");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        log.error("Unauthorized exception: {}", e.getMessage());

        ErrorResponse error = new ErrorResponse(e.getMessage(), "SESSION_EXPIRED");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
        log.error("Unhandled runtime exception: ", e);
        e.printStackTrace();

        ErrorResponse error = new ErrorResponse("Внутренняя ошибка сервера", "INTERNAL_SERVER_ERROR");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("Illegal argument exception: {}", e.getMessage());

        ErrorResponse error = new ErrorResponse(e.getMessage(), "ILLEGAL_ARGUMENT");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}