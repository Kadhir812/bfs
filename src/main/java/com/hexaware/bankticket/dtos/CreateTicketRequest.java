package com.hexaware.bankticket.dtos;

import com.hexaware.bankticket.models.enums.TicketCategory;

public class CreateTicketRequest {
    private TicketCategory category;
    private String subject;
    private String description;
}
