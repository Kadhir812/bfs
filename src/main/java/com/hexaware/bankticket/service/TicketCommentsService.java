package com.hexaware.bankticket.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hexaware.bankticket.dtos.TicketCommentRequest;
import com.hexaware.bankticket.dtos.TicketCommentResponse;
import com.hexaware.bankticket.exceptions.TicketNotFoundException;
import com.hexaware.bankticket.exceptions.UserNotFoundException;
import com.hexaware.bankticket.models.TicketComments;
import com.hexaware.bankticket.models.Tickets;
import com.hexaware.bankticket.models.User;
import com.hexaware.bankticket.repository.TicketCommentsRepository;
import com.hexaware.bankticket.repository.TicketRepository;
import com.hexaware.bankticket.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class TicketCommentsService {
    
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketCommentsRepository ticketCommentsRepository;


    public TicketCommentResponse addComments(Long ticketId, String username, TicketCommentRequest request){
        Tickets ticket = ticketRepository.findById(ticketId)
                                        .orElseThrow(() -> new TicketNotFoundException("Ticket not Found: " + ticketId));

        User user = userRepository.findByUsername(username)
                                   .orElseThrow(() ->  new UserNotFoundException("User Not found"));

        TicketComments ticketComment = TicketComments.builder()
                                                .ticket(ticket)
                                                .user(user)
                                                .message(request.getMessage())
                                                .createdAt(LocalDateTime.now())
                                                .build();

        TicketComments savedComments = ticketCommentsRepository.save(ticketComment);
        return mapToResponse(savedComments);
    }

    public List<TicketCommentResponse> getComments(Long ticketId){

        return ticketCommentsRepository.findByTicket_TicketId(ticketId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TicketCommentResponse mapToResponse(TicketComments ticketComment){
        return TicketCommentResponse.builder()
                .ticketCommentId(ticketComment.getTicketCommentId())
                .ticket(ticketComment.getTicket())
                .user(ticketComment.getUser())
                .message(ticketComment.getMessage())
                .createdAt(ticketComment.getCreatedAt())
                .build();
    }

}
