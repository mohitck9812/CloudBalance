package com.cloudBalance.backend.service.impl;

import com.cloudBalance.backend.entity.Role;
import com.cloudBalance.backend.repository.RoleRepository;
import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import com.cloudBalance.backend.exception.NoSuchElementException;
import com.cloudBalance.backend.repository.UserRepository;
import com.cloudBalance.backend.utils.Transformer;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class UserServiceImpl implements com.cloudBalance.backend.service.UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Create user. Service fetches and attaches a managed Role entity if roleId present.
     */
    public UserResponse addUser(UserRequest userRequest) {
        //TODO: VALIDATIONS
//        if (userRequest == null) throw new IllegalArgumentException("userRequest cannot be null");

        User user = Transformer.userRequestToUser(userRequest);

        if (userRequest.getRoleId() != null) {
            Role role = roleRepository.findById(userRequest.getRoleId())
                    .orElseThrow(() -> new NoSuchElementException("Role not found with id: " + userRequest.getRoleId()));
            user.setRole(role);
        }
        user.setIsActive(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        return Transformer.userToUserResponse(saved);
    }

    /**
     * Find all users and map to responses.
     */
    @Transactional(readOnly = true)
    public List<UserResponse> findAllUser() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(Transformer::userToUserResponse)
                .toList();
    }

    /**
     * Find user by id and mapping that to response
     */
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
        return Transformer.userToUserResponse(user);
    }

    @Transactional(readOnly = true)
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
        userRepository.deleteById(id);
        return Transformer.userToUserResponse(user);
    }

    /**
     * Update user fields. Only non-null / non-blank fields in request are applied.
     */
    public UserResponse updateUserById(Long id, @NotNull UserRequest userRequest) {
        User oldUser = findUserById(id);

        // password check
        if(userRequest.getPassword()!= null && !userRequest.getPassword().isBlank()){
            oldUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        // email check
        if (userRequest.getEmail() != null && !userRequest.getEmail().isBlank()) {
            oldUser.setEmail(userRequest.getEmail());
        }

        // role check
        if (userRequest.getRoleId() != null) {
            Role role = roleRepository.findById(userRequest.getRoleId())
                    .orElseThrow(() -> new NoSuchElementException("Role not found with id: " + userRequest.getRoleId()));
            oldUser.setRole(role);
        }

        //first name check
        if (userRequest.getFirstName() != null && !userRequest.getFirstName().isBlank()) {
            oldUser.setFirstName(userRequest.getFirstName());
        }

        // last name check
        if (userRequest.getLastName() != null && !userRequest.getLastName().isBlank()) {
            oldUser.setLastName(userRequest.getLastName());
        }

        // isActive check
        if (userRequest.getActive() != null && userRequest.getActive() != oldUser.getIsActive()) {
            oldUser.setIsActive(userRequest.getActive());
        }

        User newUser = userRepository.save(oldUser);
        return Transformer.userToUserResponse(newUser);
    }
}
