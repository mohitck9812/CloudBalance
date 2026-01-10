package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.request.AccountRequest;
import com.cloudBalance.backend.dto.response.AccountResponse;
import com.cloudBalance.backend.service.AccountService;
import com.cloudBalance.backend.utils.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/add")
    public ApiResponse<Void> addAccount(@Valid @RequestBody AccountRequest accountRequest){
        accountService.addAccount(accountRequest);
        return new ApiResponse<>(HttpStatus.OK, "Account created successfully", null);
    }

    @GetMapping("/get-all")
    public ApiResponse<List<AccountResponse>> getAllAccount(){
        return new ApiResponse<>(HttpStatus.OK, "List of all the accounts", accountService.getAllAccount());
    }

    @GetMapping("/user/{id}")
    public ApiResponse<List<AccountResponse>> getAccountByUserId(@PathVariable Long id){
        return new ApiResponse<>(HttpStatus.OK, "List of account of user ID: " + id, accountService.getAccountByUserId(id));
    }
}
