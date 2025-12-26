package com.cloudBalance.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private RoleResponse role;
    private boolean isActive;
    private LocalDateTime lastLogin;
}
