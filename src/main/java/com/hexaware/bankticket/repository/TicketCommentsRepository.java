package com.hexaware.bankticket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.bankticket.models.TicketComments;

public interface TicketCommentsRepository extends JpaRepository <TicketComments, Long> {
    List<TicketComments> findByTicket_TicketId(Long ticketId);
}
