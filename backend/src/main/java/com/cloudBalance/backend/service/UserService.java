package com.cloudBalance.backend.service;

import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import com.cloudBalance.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

//        if(userRepository.addUser(user)){
//            return userToUserResponse(user);
//        }
//        return null;
    }

    public List<User> findAllUser() {
        return userRepository.findAll();
    }
}
