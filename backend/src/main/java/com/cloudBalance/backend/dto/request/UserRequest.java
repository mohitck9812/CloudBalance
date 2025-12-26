package com.cloudBalance.backend.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {
    private Long roleId;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean active;
}