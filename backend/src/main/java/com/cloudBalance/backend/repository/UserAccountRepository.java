package com.cloudBalance.backend.repository;

import com.cloudBalance.backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    List<UserAccount> findAllByUser_Id(Long userId);

    void deleteAllByUser_IdAndAccount_IdIn(Long id, Set<Long> idsToRemove);

    void deleteAllByUser_Id(Long id);
}

