package com.cloudBalance.backend.service.impl;

import com.cloudBalance.backend.entity.Account;
import com.cloudBalance.backend.entity.Role;
import com.cloudBalance.backend.entity.UserAccount;
import com.cloudBalance.backend.enums.RoleType;
import com.cloudBalance.backend.exception.CustomException;
import com.cloudBalance.backend.repository.AccountRepository;
import com.cloudBalance.backend.repository.RoleRepository;
import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import com.cloudBalance.backend.exception.NoSuchElementException;
import com.cloudBalance.backend.repository.UserAccountRepository;
import com.cloudBalance.backend.repository.UserRepository;
import com.cloudBalance.backend.utils.Transformer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class UserServiceImpl implements com.cloudBalance.backend.service.UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final UserAccountRepository userAccountRepository;

    /**
     * Create user. Service fetches and attaches a managed Role entity if roleId present.
     */
    @Transactional
    public UserResponse addUser(UserRequest userRequest) {

        if (userRequest.getPassword() == null || userRequest.getPassword().isBlank()) {
            throw new CustomException("Password cannot be empty", HttpStatus.BAD_REQUEST);
        }

        User user = Transformer.userRequestToUser(userRequest);

        Role role = roleRepository.findById(userRequest.getRoleId())
                .orElseThrow(() ->
                        new CustomException("Invalid role", HttpStatus.BAD_REQUEST)
                );

        user.setRole(role);
        user.setIsActive(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        // Attach accounts only for CUSTOMER
        if (role.getName() == RoleType.CUSTOMER
                && userRequest.getAccountIds() != null
                && !userRequest.getAccountIds().isEmpty()) {

            List<UserAccount> mappings = userRequest.getAccountIds().stream()
                    .map(accountId -> {
                        Account account = accountRepository.findById(accountId)
                                .orElseThrow(() ->
                                        new CustomException(
                                                "Account not found with id: " + accountId,
                                                HttpStatus.NOT_FOUND
                                        ));
                        return UserAccount.builder()
                                .user(savedUser)
                                .account(account)
                                .build();
                    })
                    .toList();

            userAccountRepository.saveAll(mappings);
        }

        return Transformer.userToUserResponse(savedUser);
    }


    /**
     * Find all users and map to responses.
     */
    public List<UserResponse> findAllUser() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(Transformer::userToUserResponse)
                .toList();
    }

    /**
     * Find user by id and mapping that to response
     */
    @Transactional
    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
        return Transformer.userToUserResponse(user);
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    }

    // temp helper that saves the passed user directly
    public User addUserTemp(User user) {
        return userRepository.save(user);
    }

    public UserResponse deleteUserById(Long id) {
        User user = findUserById(id);
//        user.setIsActive(false);
//        userRepository.save(user);
        userRepository.deleteById(id);
        return Transformer.userToUserResponse(user);
    }

    /**
     * Update user fields. Only non-null / non-blank fields in request are applied.
     */
    @Transactional
    public UserResponse updateUserById(Long id, UserRequest userRequest) {

        User user = findUserById(id);

        if (userRequest.getPassword() != null && !userRequest.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setIsActive(userRequest.getActive());

        Role role = roleRepository.findById(userRequest.getRoleId())
                .orElseThrow(() ->
                        new NoSuchElementException("Role not found with id: " + userRequest.getRoleId())
                );

        user.setRole(role);

        // Handle account mappings only for CUSTOMER
        if (role.getName() == RoleType.CUSTOMER
                && userRequest.getAccountIds() != null) {

            Set<Long> existingAccountIds = userAccountRepository.findAllByUser_Id(id)
                    .stream()
                    .map(ua -> ua.getAccount().getId())
                    .collect(Collectors.toSet());

            Set<Long> newAccountIds = Set.copyOf(userRequest.getAccountIds());

            Set<Long> idsToRemove = existingAccountIds.stream()
                    .filter(oldId -> !newAccountIds.contains(oldId))
                    .collect(Collectors.toSet());

            Set<Long> idsToAdd = newAccountIds.stream()
                    .filter(newId -> !existingAccountIds.contains(newId))
                    .collect(Collectors.toSet());

            if (!idsToRemove.isEmpty()) {
                userAccountRepository.deleteAllByUser_IdAndAccount_IdIn(id, idsToRemove);
            }

            if (!idsToAdd.isEmpty()) {
                List<UserAccount> toAdd = idsToAdd.stream()
                        .map(accountId -> UserAccount.builder()
                                .user(user)
                                .account(
                                        accountRepository.findById(accountId)
                                                .orElseThrow(() ->
                                                        new NoSuchElementException("Account not found with id: " + accountId)
                                                )
                                )
                                .build())
                        .toList();

                userAccountRepository.saveAll(toAdd);
            }
        }

        return Transformer.userToUserResponse(user);
    }


}
