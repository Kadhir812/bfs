package com.hexaware.bankticket.models;

import java.time.LocalDateTime;



import com.hexaware.bankticket.models.enums.Status;
import com.hexaware.bankticket.models.enums.TicketCategory;

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
@Table(name="tickets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ticketId;

    @ManyToOne
    @JoinColumn(name="customerId")
    private Customer customer;

    private TicketCategory category;

    private String description;

    private Status status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    
}
