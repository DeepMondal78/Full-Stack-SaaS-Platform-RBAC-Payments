package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Next.js frontend connection allow korar jonno
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt password
        user.setRole("ROLE_USER"); // Default role

        User savedUser = userRepository.save(user);

        // Generate JWT Token
        String token = jwtUtil.generateToken(savedUser.getEmail());
        
        return ResponseEntity.ok(new AuthResponse(token, "User registered successfully!", savedUser.getRole()));
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Verify password using BCrypt
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Generate JWT Token
                String token = jwtUtil.generateToken(user.getEmail());
                return ResponseEntity.ok(new AuthResponse(token, "Login successful!", user.getRole()));
            }
        }
        
        return ResponseEntity.status(401).body("Error: Invalid email or password!");
    }
}