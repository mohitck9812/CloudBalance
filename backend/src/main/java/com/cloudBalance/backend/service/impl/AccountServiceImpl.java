package com.cloudBalance.backend.service.impl;

import com.cloudBalance.backend.dto.request.AccountRequest;
import com.cloudBalance.backend.dto.response.AccountResponse;
import com.cloudBalance.backend.entity.Account;
import com.cloudBalance.backend.entity.UserAccount;
import com.cloudBalance.backend.repository.AccountRepository;
import com.cloudBalance.backend.repository.UserAccountRepository;
import com.cloudBalance.backend.repository.UserRepository;
import com.cloudBalance.backend.service.AccountService;
import com.cloudBalance.backend.utils.Transformer;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final UserAccountRepository userAccountRepository;

    @Transactional
    public String addAccount(@Valid AccountRequest accountRequest) {
        Account account = Transformer.accountRequestToAccount(accountRequest);
        accountRepository.save(account);
        return "Account created successfully.";
    }

    public List<AccountResponse> getAllAccount(){
        return accountRepository.findAll().stream()
                .map(Transformer::accountToAccountResponse)
                .toList();
    }

    public List<AccountResponse> getAccountByUserId(Long id){
        return userAccountRepository.findAllByUser_Id(id).stream()
                .map(UserAccount::getAccount)
                .map(Transformer::accountToAccountResponse)
                .toList();
    }
}
