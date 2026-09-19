package com.hexaware.bankticket.helper;

import org.springframework.stereotype.Component;

import com.hexaware.bankticket.exceptions.CustomerNotFoundException;
import com.hexaware.bankticket.exceptions.TicketNotFoundException;
import com.hexaware.bankticket.models.Customer;
import com.hexaware.bankticket.models.Tickets;
import com.hexaware.bankticket.repository.CustomerRepository;
import com.hexaware.bankticket.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class TicketHelper {
    
    private final CustomerRepository customerRepository;
    private final TicketRepository ticketRepository;

    public Customer getCustomer(String username){
        return customerRepository.findByUserUsername(username)
                                .orElseThrow(() -> new CustomerNotFoundException("Customer not found : " + username));
    }


    public Tickets getTicket(Long ticketId){
        return ticketRepository.findById(ticketId)
                                .orElseThrow(() -> new TicketNotFoundException("Ticket Not Found: " + ticketId));
    }
    

    public Tickets getCustomerTicket(Long ticketId, String username){
        Customer customer = getCustomer(username);
        Tickets tickets = getTicket(ticketId);

        if(tickets.getCustomer().getCustomerId() != customer.getCustomerId()){
            throw new RuntimeException("Ticket does not belong to customer");
        }

        return tickets;
    }
}
