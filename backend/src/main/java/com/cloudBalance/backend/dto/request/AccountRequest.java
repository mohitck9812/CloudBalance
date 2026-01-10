package com.cloudBalance.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRequest {

    @NotNull(message = "Id can not be null")
    private Long id;

    @NotNull(message = "Account Name can not be empty")
    private String name;

    @NotNull(message = "Account ARN can not be empty")
    private String arn;

}
