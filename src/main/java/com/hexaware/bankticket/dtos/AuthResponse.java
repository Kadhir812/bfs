package com.hexaware.bankticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@Builder 
@AllArgsConstructor 
@NoArgsConstructor 
public class AuthResponse {
    
    private String username;
    private String role;
    private String token;
}
