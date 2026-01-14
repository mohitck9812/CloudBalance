package com.cloudBalance.backend.exception;

import com.cloudBalance.backend.utils.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@Slf4j
@RestControllerAdvice
public class GlobalCustomException {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<String>> customExceptionHandler(CustomException e) {

        ApiResponse<String> response = new ApiResponse<>(
                e.getHttpStatus(),
                e.getMessage(),
                e.getMessage()
        );

        return ResponseEntity
                .status(e.getHttpStatus())
                .body(response);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiResponse<String>> disabledException(DisabledException ex) {

        ApiResponse<String> response = new ApiResponse<>(
                HttpStatus.FORBIDDEN,
                "Account is not active",
                ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(response);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>> methodArgumentNotValidException(
            MethodArgumentNotValidException ex
    ) {
        ApiResponse<String> response = new ApiResponse<>(
                HttpStatus.BAD_REQUEST,
                "Validation failed",
                ex.getBindingResult().getFieldError().getDefaultMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<String>> badCredentialsExceptions(BadCredentialsException ex){
        ApiResponse<String> response = new ApiResponse<>(HttpStatus.FORBIDDEN, "Invalid Credentials", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<String>> dataIntegrityViolation(DataIntegrityViolationException ex) {
        String message = "Duplicate value";
        if (ex.getMessage().contains("uk_user_email")) {
            message = "Email already exists";
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(
                        HttpStatus.BAD_REQUEST,
                        message,
                        "Please use a different email"
                ));
    }
}
