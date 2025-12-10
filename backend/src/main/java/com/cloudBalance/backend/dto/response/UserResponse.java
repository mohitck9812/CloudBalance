package com.cloudBalance.backend.dto.response;

import lombok.*;

import java.util.Date;

@Builder
@Data
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private RoleResponse role;
    private boolean isActive;
    private Date lastLogin;

}
