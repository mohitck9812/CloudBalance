package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @PostMapping(value = "/add")
    public ResponseEntity<UserResponse> addUser(@Valid @RequestBody UserRequest user) {
        UserResponse userResponse = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }


    // to edit this
    @GetMapping("/all-user")
    public ResponseEntity<List<UserResponse>> showAllUser(){
        List<UserResponse> result = userService.findAllUser();
        return result != null ? new ResponseEntity<>(result, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
            UserResponse userResponse = userService.getUserById(id);
            return ResponseEntity.ok(userResponse);
    }

//    @PostMapping("/add-temp")
//    public ResponseEntity<?> addUserTemp(@RequestBody User user){
//        return new ResponseEntity<>(userService.addUserTemp(user), HttpStatus.CREATED);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponse> deleteUserById(@PathVariable Long id) {
        UserResponse deletedUser = userService.deleteUserById(id);
        return ResponseEntity.ok(deletedUser);
    }



    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUserById(@PathVariable Long id, @RequestBody UserRequest userRequest){
        UserResponse userResponse = userService.updateUserById(id, userRequest);
        return ResponseEntity.ok(userResponse);
    }

}
