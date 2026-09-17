package com.hexaware.bankticket.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.bankticket.models.Tickets;

public interface TicketRepository extends JpaRepository <Tickets, Long> {
    List<Tickets> findByCustomerId(Long customerId);
}
