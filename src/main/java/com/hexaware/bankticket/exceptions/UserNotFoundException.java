package com.hexaware.bankticket.exceptions;


public class UserNotFoundException extends RuntimeException {
     public UserNotFoundException(String message){
        super(message);
     }
}
