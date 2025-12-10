package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import com.cloudBalance.backend.service.RoleService;
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
    public List<RoleResponse> getAllRole(){
        return roleService.getAllRole();
    }

    @PostMapping
    public ResponseEntity<RoleResponse> addRole(@RequestBody @Valid RoleRequest roleRequest){
        return new ResponseEntity<>(roleService.addRole(roleRequest), HttpStatus.CREATED);
    }



}
