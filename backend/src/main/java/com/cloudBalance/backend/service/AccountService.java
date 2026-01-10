package com.cloudBalance.backend.service;

import com.cloudBalance.backend.dto.request.AccountRequest;
import com.cloudBalance.backend.dto.response.AccountResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface AccountService {


    String addAccount(@Valid AccountRequest accountRequest);

    List<AccountResponse> getAllAccount();

    List<AccountResponse> getAccountByUserId(Long id);
}
