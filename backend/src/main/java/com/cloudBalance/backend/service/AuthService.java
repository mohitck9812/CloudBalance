package com.cloudBalance.backend.service;

import com.cloudBalance.backend.dto.request.LoginRequest;
import com.cloudBalance.backend.dto.response.LoginResponse;
import com.cloudBalance.backend.utils.ApiResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
