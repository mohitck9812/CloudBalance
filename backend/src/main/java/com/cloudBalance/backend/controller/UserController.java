package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.service.UserService;
import com.cloudBalance.backend.utils.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private final PasswordEncoder passwordEncoder;

    @PostMapping(value = "/add")
    public ApiResponse<UserResponse> addUser(@Valid @RequestBody UserRequest user) {
        UserResponse userResponse = userService.addUser(user);
        return new ApiResponse<>(HttpStatus.CREATED, "Data Created Sucessfully", userResponse);
    }


    // to edit this
    @GetMapping("/all-user")
    public ApiResponse<List<UserResponse>> showAllUser(){
        List<UserResponse> result = userService.findAllUser();
        return new ApiResponse<>(HttpStatus.OK,"List of all the users", result);
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable Long id){
//        System.out.println(userService.getClass());
            UserResponse userResponse = userService.getUserById(id);
            return new ApiResponse<>(HttpStatus.OK, "User detail of user id: " + id, userResponse);
    }

//    @PostMapping("/add-temp")
//    public ResponseEntity<?> addUserTemp(@RequestBody User user){
//        return new ResponseEntity<>(userService.addUserTemp(user), HttpStatus.CREATED);
//    }

    @DeleteMapping("/{id}")
    public ApiResponse<UserResponse> deleteUserById(@PathVariable Long id) {
        UserResponse deletedUser = userService.deleteUserById(id);
        return new ApiResponse<>(HttpStatus.NO_CONTENT, "User id: " + id + " deleted successfully", deletedUser);
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUserById(@PathVariable Long id,@Valid @RequestBody UserRequest userRequest){
        UserResponse userResponse = userService.updateUserById(id, userRequest);
        return new ApiResponse<>(HttpStatus.OK, " User id: "+ id + " updated successfully" , userResponse);

    }

}
