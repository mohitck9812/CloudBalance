package com.cloudBalance.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AccountResponse {

    private Long id;
    private String name;
    private String arn;
}
