package com.cloudBalance.backend.utils;

import com.cloudBalance.backend.entity.Account;
import com.cloudBalance.backend.entity.UserAccount;
import com.cloudBalance.backend.enums.RoleType;
import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import com.cloudBalance.backend.entity.Role;
import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import org.springframework.lang.Nullable;


public class Transformer {

    // user -> user response (safe, null-checking)
    public static UserResponse userToUserResponse(User user) {

        RoleResponse roleResp;
        Role role = user.getRole();
             String roleName = role.getName().toString();

            roleResp = RoleResponse.builder()
                    .id(role.getId())
                    .roleName(roleName)
                    .build();


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

        return User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword()!=null ? userRequest.getPassword() : "")
//                .role()
                .build();
    }

    // roleId -> RoleRequest DTO
    public static Role roleIdToRoleRequest(Long id) {
        return roleRequestToRole(RoleRequest.builder().id(id).build());
    }

    // Role -> RoleResponse
    public static RoleResponse roleToRoleResponse(Role role) {
        String roleName = role.getName() == null ? null : role.getName().toString();
        return RoleResponse.builder()
                .id(role.getId())
                .roleName(roleName)
                .build();
    }

    // RoleRequest -> Role
    public static Role roleRequestToRole(RoleRequest roleRequest) {
        return Role.builder()
                .id(roleRequest.getId())
                .build();
    }


    public static RoleType roleTypeFromId(Long id) {
        try {
            return RoleType.fromId(id);
        }  catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static UserAccount userAndAccountToUserAccount(User user, Account account){
        return UserAccount.builder()
                .user(user)
                .account(account)
//                .linkedAt(LocalDateTime.now())
                .build();
    }
}
