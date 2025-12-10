package com.cloudBalance.backend.dto.response;

import lombok.*;

@Builder
@Data
public class RoleResponse {

    private Long id;
    private String roleName;
}
