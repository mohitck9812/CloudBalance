package com.cloudBalance.backend.service;

import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import com.cloudBalance.backend.exception.NoSuchElementException;
import com.cloudBalance.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
 import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    private UserResponse userToUserResponse(User user){
        if(user == null) return null;
        return UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .isActive(user.getIsActive())
                .lastLogin(user.getLastLogin())
                .role(user.getRoles())
                .build();
    }

    public UserResponse addUser(UserRequest userRequest) {
        User user = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .roles(userRequest.getRoles())
                .isActive(false)
                .lastLogin(null)
                .build();

        return userToUserResponse(userRepository.save(user));

    }

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        return userToUserResponse(user);
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    //temp
    public User addUserTemp(User user) {
        return userRepository.save(user);
    }

    public UserResponse deleteUserById(Long id) {
        User user = findUserById(id);
        userRepository.deleteById(id);
        return userToUserResponse(user);
    }

    public UserResponse updateUserById(Long id, UserRequest userRequest) {
        User oldUser = findUserById(id);

        if(userRequest.getEmail() != "") oldUser.setEmail(userRequest.getEmail());
        if(userRequest.getRoles() != null) oldUser.setRoles(userRequest.getRoles());
        if(userRequest.getFirstName() != "") oldUser.setFirstName(userRequest.getFirstName());
        if(userRequest.getLastName() != "") oldUser.setLastName(userRequest.getLastName());
        if(userRequest.getIsActive() != oldUser.getIsActive()) oldUser.setIsActive(userRequest.getIsActive());

        User newUser =  userRepository.save(oldUser);
        return userToUserResponse(newUser);
    }
}
