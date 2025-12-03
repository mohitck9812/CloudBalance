package com.cloudBalance.backend.dto.response;

import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private String firstName;
    private String lastName;
    private String email;
    private List<String> role;
    private boolean isActive;
    private Date lastLogin;

}
