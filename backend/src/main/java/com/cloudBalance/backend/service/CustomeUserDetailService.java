package com.cloudBalance.backend.service;

import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomeUserDetailService extends UserDetailsService {
    UserDetails loadUserByUsername(@NonNull String email);

}
