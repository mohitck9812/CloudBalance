package com.cloudBalance.backend.service.impl;

import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import com.cloudBalance.backend.entity.Role;
import com.cloudBalance.backend.enums.RoleType;
import com.cloudBalance.backend.repository.RoleRepository;
import com.cloudBalance.backend.utils.Transformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements com.cloudBalance.backend.service.RoleService {

    private final RoleRepository roleRepository;


    @Override
    public List<RoleResponse> getAllRole() {
        return roleRepository.findAll()
                .stream()
                .map(Transformer::roleToRoleResponse)
                .toList();
    }

    @Override
    public RoleResponse addRole(RoleRequest roleRequest) {
        Role role = Transformer.roleRequestToRole(roleRequest);
        role.setName(RoleType.fromId(roleRequest.getId()));
        return Transformer.roleToRoleResponse(roleRepository.save(role));
    }


}
