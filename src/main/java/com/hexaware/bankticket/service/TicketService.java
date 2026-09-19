package com.hexaware.bankticket.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hexaware.bankticket.dtos.CreateTicketRequest;
import com.hexaware.bankticket.dtos.TicketResponse;
import com.hexaware.bankticket.helper.TicketHelper;
import com.hexaware.bankticket.models.Customer;
import com.hexaware.bankticket.models.Tickets;
import com.hexaware.bankticket.models.enums.Status;
import com.hexaware.bankticket.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {
    
    private final TicketRepository ticketRepository;
    private final TicketHelper ticketHelper;
    

    //create ticket
    public TicketResponse createTicket(CreateTicketRequest request, String username){

        Customer customer = ticketHelper.getCustomer(username);
    
        Tickets ticket = Tickets.builder()
            .customer(customer)
            .category(request.getCategory())
            .subject(request.getSubject())
            .description(request.getDescription())
            .status(Status.OPEN)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        Tickets saved = ticketRepository.save(ticket);

        return toResponse(saved);

    }

    public List<TicketResponse> getMyTickets(String username){
        Customer customer = ticketHelper.getCustomer(username);
    
        return ticketRepository.findByCustomer(customer)
                                .stream()
                                .map(this::toResponse)
                                .toList();
    }

    public TicketResponse updateTicket(Long ticketId,CreateTicketRequest request,String username){
        Tickets ticket = ticketHelper.getCustomerTicket(ticketId, username);

        ticket.setCategory(request.getCategory());
        ticket.setSubject(request.getSubject());
        ticket.setDescription(request.getDescription());
        ticket.setUpdatedAt(LocalDateTime.now());

        Tickets updatedTicket = ticketRepository.save(ticket);

        return toResponse(updatedTicket);
    }

    public void deleteTicket(Long ticketId, String username){
        Tickets ticket = ticketHelper.getCustomerTicket(ticketId, username);

        ticketRepository.delete(ticket);

    }

    private TicketResponse toResponse(Tickets ticket){
        
        return TicketResponse.builder()
        .ticketId(ticket.getTicketId())
        .customer(ticket.getCustomer())
        .category(ticket.getCategory())
        .subject(ticket.getSubject())
        .description(ticket.getDescription())
        .status(ticket.getStatus())
        .createdAt(ticket.getCreatedAt())
        .updatedAt(ticket.getUpdatedAt())
        .build();
    }

}
