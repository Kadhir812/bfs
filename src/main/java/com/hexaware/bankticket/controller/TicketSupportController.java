package com.hexaware.bankticket.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.bankticket.dtos.TicketResponse;
import com.hexaware.bankticket.models.enums.Status;
import com.hexaware.bankticket.service.TicketSupportService;

import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/support/tickets")
@RequiredArgsConstructor 
@PreAuthorize("hasRole('BANK_SUPPORT')")
public class TicketSupportController {

    private final TicketSupportService ticketSupport;

    @GetMapping()
    public ResponseEntity<List<TicketResponse>> getAllTicket(){
        return ResponseEntity.ok(ticketSupport.getAllTickets());
    }


    @PutMapping("/{ticketId}/status")
    public ResponseEntity<TicketResponse> updateStatus(@PathVariable Long ticketId,
                                                @RequestParam Status status){
            
                TicketResponse response = ticketSupport.updateTicket(ticketId, status);

                return ResponseEntity.ok(response);

    }
}
