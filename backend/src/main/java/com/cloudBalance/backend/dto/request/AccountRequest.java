package com.cloudBalance.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRequest {

    @NotNull(message = "Account Name can not be empty")
    private String accountName;

    @NotNull(message = "Account ARM can not be empty")
    private String accountARM;


}
