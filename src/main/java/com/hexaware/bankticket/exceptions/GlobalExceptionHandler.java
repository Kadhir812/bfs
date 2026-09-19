package com.hexaware.bankticket.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice 
public class GlobalExceptionHandler {
    @ExceptionHandler(TicketNotFoundException.class)
    public ResponseEntity<String> handleTicketNotFound(TicketNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(exception.getMessage());
    }

    @ExceptionHandler (CustomerNotFoundException.class)
    public ResponseEntity<String> handleCustomerNotFound(CustomerNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)          
                            .body(exception.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(exception.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFound(UsernameNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(exception.getMessage());
    }
}
