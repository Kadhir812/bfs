package com.hexaware.bankticket.dtos;

import com.hexaware.bankticket.models.enums.TicketCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data 
@Builder 
@AllArgsConstructor 
@NoArgsConstructor 
public class CreateTicketRequest {
    private TicketCategory category;
    private String subject;
    private String description;
}
