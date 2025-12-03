package com.cloudBalance.backend.dto.request;

import com.cloudBalance.backend.entity.User;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private String firstName;
    private String lastName;
    private String email;
    private List<String> roles;
}
