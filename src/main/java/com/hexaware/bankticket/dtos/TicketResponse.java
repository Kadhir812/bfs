package com.hexaware.bankticket.dtos;

import java.time.LocalDateTime;

import com.hexaware.bankticket.models.Customer;
import com.hexaware.bankticket.models.enums.Status;
import com.hexaware.bankticket.models.enums.TicketCategory;

public class TicketResponse {
    private long ticketId;

    private Customer customer;

    private TicketCategory category;

    private String subject;

    private String description;

    private Status status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
