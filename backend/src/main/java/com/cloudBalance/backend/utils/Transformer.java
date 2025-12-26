package com.cloudBalance.backend.utils;

import com.cloudBalance.backend.enums.RoleType;
import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import com.cloudBalance.backend.entity.Role;
import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;


public class Transformer {

    // user -> user response (safe, null-checking)
    public static UserResponse userToUserResponse(User user) {
        if (user == null) return null;

        RoleResponse roleResp = null;
        Role role = user.getRole();
        if (role != null) {
             String roleName = role.getName() == null ? null : role.getName().toString();

            roleResp = RoleResponse.builder()
                    .id(role.getId())
                    .roleName(roleName)
                    .build();
        }

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(roleResp)
                .isActive(user.getIsActive())
                .lastLogin(user.getLastLogin())
                .build();
    }

    // userRequest -> user (do NOT attach Role entity here)
    // The service should set the Role by loading it from RoleRepository.
    public static User userRequestToUser(UserRequest userRequest) {
        if (userRequest == null) return null;

//        Role role = Role.builder()
//                .id(userRequest.getRoleId())
//                .name(new RoleType(userRequest.getRoleId()))
//                .build();

        return User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
//                .role()
                .build();
    }

    // Helper: convert roleId -> RoleRequest DTO (still simple)
    public static Role roleIdToRoleRequest(Long id) {
        if (id == null) return null;
        return roleRequestToRole(RoleRequest.builder().id(id).build());
    }

    // Role -> RoleResponse
    public static RoleResponse roleToRoleResponse(Role role) {
        if (role == null) return null;
        String roleName = role.getName() == null ? null : role.getName().toString();
        return RoleResponse.builder()
                .id(role.getId())
                .roleName(roleName)
                .build();
    }

    // RoleRequest -> Role (QUICK-BUILDER only: returns a lightweight Role with id set)
    // NOTE: This does NOT load from DB. Prefer letting the service fetch the Role entity.
    public static Role roleRequestToRole(RoleRequest roleRequest) {
        if (roleRequest == null || roleRequest.getId() == null) return null;

        return Role.builder()
                .id(roleRequest.getId())
                .build();
    }

    public static RoleType roleTypeFromId(Long id) {
        if (id == null) return null;
        try {
            return RoleType.fromId(id);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }
}
