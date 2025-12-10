package com.cloudBalance.backend.service;


import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoleService {

    List<RoleResponse> getAllRole();

    RoleResponse addRole(RoleRequest roleRequest);
}
