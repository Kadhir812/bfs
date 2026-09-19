package com.hexaware.bankticket.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hexaware.bankticket.dtos.TicketResponse;
import com.hexaware.bankticket.exceptions.TicketNotFoundException;
import com.hexaware.bankticket.models.Tickets;
import com.hexaware.bankticket.models.enums.Status;
import com.hexaware.bankticket.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class TicketSupportService {

    private final TicketRepository ticketRepository;

    public List<TicketResponse> getAllTickets(){
        return ticketRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    public TicketResponse updateTicket(Long ticketId, Status status){
        Tickets ticket = ticketRepository.findById(ticketId)
                                            .orElseThrow(() -> new TicketNotFoundException("Ticket Not Found"));

            ticket.setStatus(status);

            Tickets updatedTicket = ticketRepository.save(ticket);

            return mapToResponse(updatedTicket);

    }


    private TicketResponse mapToResponse(Tickets ticket){

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
