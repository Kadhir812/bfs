package com.hexaware.bankticket.dtos;

import java.time.LocalDateTime;

import com.hexaware.bankticket.models.Tickets;
import com.hexaware.bankticket.models.User;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@Builder 
@NoArgsConstructor 
@AllArgsConstructor 
public class TicketCommentResponse {

    private Long ticketCommentId;
    
    private Tickets ticket;

    private User user;

    private String message;

    private LocalDateTime createdAt;
}
