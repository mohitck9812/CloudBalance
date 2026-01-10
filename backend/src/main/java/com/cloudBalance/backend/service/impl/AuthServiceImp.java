package com.cloudBalance.backend.service.impl;

import com.cloudBalance.backend.dto.request.LoginRequest;
import com.cloudBalance.backend.dto.response.LoginResponse;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import com.cloudBalance.backend.exception.CustomException;
import com.cloudBalance.backend.repository.UserRepository;
import com.cloudBalance.backend.service.AuthService;
import com.cloudBalance.backend.utils.ApiResponse;
import com.cloudBalance.backend.utils.AuthUtil;
import com.cloudBalance.backend.utils.Transformer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;


    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        User user = (User) authentication.getPrincipal();
        if (!user.getIsActive()) {
            throw new CustomException("User is inactive", HttpStatus.FORBIDDEN);
        }
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        String token = authUtil.generateAccessToken(user);
        UserResponse userResponse  = Transformer.userToUserResponse(user);
        return new LoginResponse(token, userResponse);
    }

}
