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

import java.util.HashSet;
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
    public UserResponse updateUserById(Long id, UserRequest request) {

        User user = findUserById(id);

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setIsActive(request.getActive());

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);

        List<UserAccount> accounts = user.getUserAccounts();

        if (role.getName() != RoleType.CUSTOMER) {
            accounts.clear();
            return Transformer.userToUserResponse(user);
        }

        Set<Long> existingIds = accounts.stream()
                .map(ua -> ua.getAccount().getId())
                .collect(Collectors.toSet());

        Set<Long> newIds = request.getAccountIds() == null
                ? Set.of()
                : new HashSet<>(request.getAccountIds());

        accounts.removeIf(ua ->
                !newIds.contains(ua.getAccount().getId())
        );

        for (Long accId : newIds) {
            if (!existingIds.contains(accId)) {
                Account acc = accountRepository.findById(accId)
                        .orElseThrow();

                accounts.add(
                        UserAccount.builder()
                                .user(user)
                                .account(acc)
                                .build()
                );
            }
        }

        return Transformer.userToUserResponse(user);

    }

}
