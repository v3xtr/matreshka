package com.matreshka.auth_service.delivery.http;

import com.matreshka.auth_service.delivery.http.dto.ErrorResponseDTO;
import com.matreshka.auth_service.internal.exceptions.BadRequestException;
import com.matreshka.auth_service.internal.exceptions.ConflictException;
import com.matreshka.auth_service.internal.exceptions.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AuthControllerAdvice {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponseDTO> handleBadRequestException(BadRequestException e) {
        log.error("Bad request exception: {}", e.getMessage());

        ErrorResponseDTO error = new ErrorResponseDTO(e.getMessage(), "BAD_REQUEST");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleUserNotFoundException(UserNotFoundException e) {
        log.error("User not found exception: {}", e.getMessage());

        ErrorResponseDTO error = new ErrorResponseDTO(e.getMessage(), "USER_NOT_FOUND");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponseDTO> handleConflictException(ConflictException e) {
        log.error("Conflict exception: {}", e.getMessage());

        ErrorResponseDTO error = new ErrorResponseDTO(e.getMessage(), "CONFLICT");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(RuntimeException e) {
        log.error("Unhandled runtime exception: ", e);
        e.printStackTrace();

        ErrorResponseDTO error = new ErrorResponseDTO("Внутренняя ошибка сервера", "INTERNAL_SERVER_ERROR");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}