package com.hexaware.bankticket.models;


import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="TicketComment")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long TicketCommentId;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Tickets ticket;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String message;

    private LocalDateTime createdAt;
}
