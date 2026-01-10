package com.cloudBalance.backend.controller;


import com.cloudBalance.backend.dto.request.LoginRequest;
import com.cloudBalance.backend.dto.response.LoginResponse;
import com.cloudBalance.backend.service.AuthService;
import com.cloudBalance.backend.utils.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        return new ApiResponse<>(HttpStatus.OK, "Login successful", authService.login(loginRequest));
    }
}
