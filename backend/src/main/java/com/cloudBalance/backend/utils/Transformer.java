package com.cloudBalance.backend.utils;

import com.cloudBalance.backend.dto.request.AccountRequest;
import com.cloudBalance.backend.dto.response.AccountResponse;
import com.cloudBalance.backend.entity.Account;
import com.cloudBalance.backend.entity.UserAccount;
import com.cloudBalance.backend.enums.RoleType;
import com.cloudBalance.backend.dto.request.RoleRequest;
import com.cloudBalance.backend.dto.response.RoleResponse;
import com.cloudBalance.backend.entity.Role;
import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import jakarta.validation.Valid;
import org.springframework.lang.Nullable;

import java.util.List;


public class Transformer {

    // user -> user response (safe, null-checking)
    public static UserResponse userToUserResponse(User user) {

        RoleResponse roleResp = null;
        if (user.getRole() != null) {
            roleResp = RoleResponse.builder()
                    .id(user.getRole().getId())
                    .roleName(
                            user.getRole().getName() != null
                                    ? user.getRole().getName().name()
                                    : null
                    )
                    .build();
        }

        List<AccountResponse> accounts =
                user.getUserAccounts() == null
                        ? List.of()
                        : user.getUserAccounts().stream()
                        .map(UserAccount::getAccount)
                        .map(Transformer::accountToAccountResponse)
                        .toList();

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(roleResp)
                .isActive(Boolean.TRUE.equals(user.getIsActive()))
                .lastLogin(user.getLastLogin())
                .accounts(accounts)
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

    public static Account accountRequestToAccount(AccountRequest accountRequest) {
        return Account.builder()
                .id(accountRequest.getId())
                .name(accountRequest.getName())
                .arn(accountRequest.getArn())
                .build();
    }

    public static AccountResponse accountToAccountResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .name(account.getName())
                .arn(account.getArn())
                .build();
    }
}
















