package com.cloudBalance.backend.service;

import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;

import java.util.List;

public interface UserService {
    UserResponse addUser(UserRequest userRequest);
    List<UserResponse> findAllUser();
    UserResponse getUserById(Long id);
    User findUserById(Long id);
    User addUserTemp(User user);
    UserResponse deleteUserById(Long id);
    UserResponse updateUserById(Long id, UserRequest userRequest);
}
