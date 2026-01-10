package com.cloudBalance.backend.exception;

import com.cloudBalance.backend.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalCustomException {

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ApiResponse<String> methodArgumentNotValidException(MethodArgumentNotValidException e){
//        return new ApiResponse<String>(HttpStatus.BAD_REQUEST,e.getMessage(),"Method argument not valid error");
//    }

    @ExceptionHandler(CustomException.class)
    public ApiResponse<String> customExceptionHandler(CustomException e){
        return new ApiResponse<>(e.getHttpStatus(), e.getMessage(),e.getMessage());
    }

}
