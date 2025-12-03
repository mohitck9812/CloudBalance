package com.cloudBalance.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Public {

//    @GetMapping("/call")
//    public ResponseEntity<String> generalCall(){return new ResponseEntity<String>(HttpStatus.OK);
//    }

    @GetMapping("/call")
    public ResponseEntity<String> generalCall(){
        return new ResponseEntity<>("This is the result", HttpStatus.ACCEPTED);
    }
}
