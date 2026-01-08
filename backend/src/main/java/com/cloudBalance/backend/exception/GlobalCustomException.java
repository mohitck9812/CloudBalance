package com.cloudBalance.backend.exception;

import com.cloudBalance.backend.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalCustomException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<String> methodArgumentNotValidException(MethodArgumentNotValidException e){
        ApiResponse<String> apiError = new ApiResponse<String>(HttpStatus.BAD_REQUEST,e.getMessage(),"Method argument not valid error");
        return apiError;
    }

//    @ExceptionHandler(CustomException.class)
//    public ResponseEntity<ApiResponse<ApiResponse<Void>>> customExceptionHandler(CustomException e){
//        ApiResponse<Void> ap = new ApiResponse<Void>(HttpStatus.BAD_REQUEST, e.getMessage()," ");
//        return ResponseEntity.status(ap.getStatus()).body(ap);
//    }f

}
