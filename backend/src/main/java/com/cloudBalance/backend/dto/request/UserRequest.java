package com.cloudBalance.backend.dto.request;

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

    @Builder.Default
    private List<Long> accountIds = List.of();

}
