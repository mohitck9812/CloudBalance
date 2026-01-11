package com.cloudBalance.backend.utils;

import com.cloudBalance.backend.dto.response.LoginResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Data
public class ApiResponse<T> {

    private HttpStatus status;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public ApiResponse(HttpStatus httpStatus, String message, T data) {
        this.status = httpStatus;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }
}
