package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import com.cloudBalance.backend.service.RoleService;
import com.cloudBalance.backend.utils.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ApiResponse<List<RoleResponse>> getAllRole(){
        return new ApiResponse<>(HttpStatus.OK, "List of all role", roleService.getAllRole());
    }

    @PostMapping
    public ApiResponse<RoleResponse> addRole(@RequestBody @Valid RoleRequest roleRequest){
        return new ApiResponse<>(HttpStatus.CREATED, "Role Created" ,roleService.addRole(roleRequest));
    }



}
