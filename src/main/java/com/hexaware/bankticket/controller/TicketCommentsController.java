package com.hexaware.bankticket.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.bankticket.dtos.TicketCommentRequest;
import com.hexaware.bankticket.dtos.TicketCommentResponse;
import com.hexaware.bankticket.service.TicketCommentsService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping("/tickets/{ticketId}/comments")
@RequiredArgsConstructor 
@PreAuthorize("hasAnyRole('CUSTOMER','BANK_SUPPORT')")
public class TicketCommentsController {

    private final TicketCommentsService ticketCommentsService;


    @PostMapping
    public ResponseEntity<TicketCommentResponse> addComment(@PathVariable Long ticketId, 
                                    @RequestBody TicketCommentRequest request, Principal principal){

        String username = principal.getName();
        TicketCommentResponse response = ticketCommentsService.addComments(ticketId, username, request);

        return ResponseEntity .status(HttpStatus.CREATED)
                            .body(response);

    }


    @GetMapping
    public ResponseEntity<List<TicketCommentResponse>> getComments(@PathVariable Long ticketId) {
        return ResponseEntity.ok(ticketCommentsService.getComments(ticketId));
    }
    
    
}
