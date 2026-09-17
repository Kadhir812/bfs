package com.hexaware.bankticket.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.bankticket.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByUserUsername(String username);
}
