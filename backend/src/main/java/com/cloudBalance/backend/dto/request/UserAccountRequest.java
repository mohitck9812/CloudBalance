package com.cloudBalance.backend.dto.request;

import com.cloudBalance.backend.entity.Account;
import com.cloudBalance.backend.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountRequest {

    @NotNull(message = "User data can not be null")
    private User user;

    @NotNull(message = "Account data can not be null")
    private Account account;
}
