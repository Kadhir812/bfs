package com.hexaware.bankticket.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hexaware.bankticket.dtos.CreateTicketRequest;
import com.hexaware.bankticket.dtos.TicketResponse;
import com.hexaware.bankticket.models.Customer;
import com.hexaware.bankticket.models.Tickets;
import com.hexaware.bankticket.models.enums.Status;
import com.hexaware.bankticket.repository.CustomerRepository;
import com.hexaware.bankticket.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {
    
    private TicketRepository ticketRepository;
    private CustomerRepository customerRepository;

    //create ticket

    public TicketResponse createTicket(CreateTicketRequest request, String username){

        Customer customer = customerRepository.findByUserUsername(username)
                        .orElseThrow(() -> new RuntimeException("Customer not Found"));

    
        Tickets ticket = Tickets.builder()
            .customer(customer)
            .category(request.getCategory())
            .subject(request.getSubject())
            .description(request.getDescription())
            .status(Status.IN_PROGRESS)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        Tickets saved = ticketRepository.save(ticket);

        return mapToResponse(saved);
    }

    public List<TicketResponse> getMyTickets(Long ticketId,String username){
        Customer customer = customerRepository.findByUserUsername(username)
                                            .orElseThrow(() -> new RuntimeException("Customer not Found"));

        
        Tickets tickets = ticketRepository.findById(ticketId)
                                .orElseThrow(() -> new RuntimeException("Ticket not Found"));

        return mapToResponse(tickets);
    }

    public void deleteTicket(Long ticketId, String username){
        Customer customer = customerRepository.findByUserUsername(username)
                                .orElseThrow(() -> new RuntimeException("Customer not Found"));
                                
        Tickets tickets = ticketRepository.findById(ticketId)
                                .orElseThrow(() -> new RuntimeException("Ticket not Found"));

        ticketRepository.delete(tickets);

    }

}
