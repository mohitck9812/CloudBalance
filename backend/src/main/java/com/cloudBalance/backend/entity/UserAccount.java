package com.cloudBalance.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "user_account",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "account_id"})
        }
)
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserAccount that)) return false;

        return user != null && account != null
                && user.getId().equals(that.user.getId())
                && account.getId().equals(that.account.getId());
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(user.getId(), account.getId());
    }
}
