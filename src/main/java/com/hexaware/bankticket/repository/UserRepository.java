package com.hexaware.bankticket.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.bankticket.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
