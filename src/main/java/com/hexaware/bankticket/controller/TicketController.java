package com.hexaware.bankticket.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.bankticket.dtos.CreateTicketRequest;
import com.hexaware.bankticket.dtos.TicketResponse;
import com.hexaware.bankticket.service.TicketService;

import lombok.RequiredArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping("/tickets")
@RequiredArgsConstructor 
@PreAuthorize("hasRole('CUSTOMER')")
public class TicketController {
    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketResponse> createTicket(@RequestBody CreateTicketRequest request, 
                                                                    Principal principal){
            String username = principal.getName();

            TicketResponse response = ticketService.createTicket(request, username);

            return ResponseEntity.status(HttpStatus.CREATED)
                                .body(response);
                                                                    
        }

    @GetMapping
    public ResponseEntity<List<TicketResponse>> getMyTickets(Principal principal){
        String username = principal.getName();

        return ResponseEntity.ok(ticketService.getMyTickets(username));

    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<TicketResponse> updateTicket(@PathVariable Long ticketId, 
        @RequestBody CreateTicketRequest request, Principal principal){
            String username = principal.getName();

            TicketResponse response = ticketService.updateTicket(ticketId, request, username);

            return ResponseEntity.ok(response);
        }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long TicketId, Principal principal){
        
        String username = principal.getName();

        ticketService.deleteTicket(TicketId, username);

        return ResponseEntity.noContent().build();
    }

    
}
