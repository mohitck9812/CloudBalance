package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.request.UserRequest;
import com.cloudBalance.backend.dto.response.UserResponse;
import com.cloudBalance.backend.entity.User;
import com.cloudBalance.backend.service.UserService;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/add")
    public ResponseEntity<UserResponse> addUser(@RequestBody UserRequest user){
        try{
            UserResponse userResponse = userService.addUser(user);
            if (userResponse != null) {
                return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all-user")
    public ResponseEntity<List<User>> showAllUser(){
        List<User> result = userService.findAllUser();
        return result != null ? new ResponseEntity<>(result, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
        try{
            UserResponse userResponse = userService.getUserById(id);
            return ResponseEntity.ok(userResponse);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add-temp")
    public ResponseEntity<?> addUserTemp(@RequestBody User user){
        return new ResponseEntity<>(userService.addUserTemp(user), HttpStatus.CREATED);
    }

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
