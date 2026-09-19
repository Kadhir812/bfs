package com.hexaware.bankticket.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hexaware.bankticket.security.JwtService;

import com.hexaware.bankticket.dtos.AuthResponse;
import com.hexaware.bankticket.dtos.LoginRequest;
import com.hexaware.bankticket.dtos.RegisterRequest;
import com.hexaware.bankticket.models.Customer;
import com.hexaware.bankticket.models.User;
import com.hexaware.bankticket.models.enums.Role;
import com.hexaware.bankticket.repository.CustomerRepository;
import com.hexaware.bankticket.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public String registerCustomer(RegisterRequest request){

        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("username already exists");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
            .username(request.getUsername())
            .password(encodedPassword)
            .role(Role.CUSTOMER)
            .build();

        User saved = userRepository.save(user);

        Customer customer = Customer.builder()
            .name(request.getName())
            .user(saved)
            .email(request.getEmail())
            .build();

        customerRepository.save(customer);

        return "Customer registered successfully";
    }

    public AuthResponse login(LoginRequest request){

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
            request.getUsername(),
            request.getPassword()
        )
    );

    User user = userRepository.findByUsername(request.getUsername())
                                    .orElseThrow(()-> new RuntimeException("Customer not found"));

    String token = jwtService.generateToken(user.getUsername(),user.getRole().name());

    return AuthResponse.builder()
            .token(token)
            .username(user.getUsername())
            .role(user.getRole().name())
            .build();

    };
}
