package com.cloudBalance.backend.dto.request;

import com.cloudBalance.backend.entity.Account;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {

    @NotNull(message = "Role id is required")
    private Long roleId;

    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private List<Account> account;
}
