package com.cloudBalance.backend.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException {
    public final HttpStatus httpStatus;
    public CustomException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus=httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
