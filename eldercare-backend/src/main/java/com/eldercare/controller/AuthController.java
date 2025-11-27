package com.eldercare.controller;

import com.eldercare.dto.LoginRequest;
import com.eldercare.dto.RegisterRequest;
import com.eldercare.model.User;
import com.eldercare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        //code checks if email exists
        Optional<User> existing = userRepository.findByEmail(req.email);
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        User user = new User();
        user.setFullName(req.fullName);
        user.setEmail(req.email);
        user.setPassword(req.password); // we will hash later
        user.setRole(req.role);
        user.setLocation(req.location);
        user.setBio(req.bio);
        user.setPhone(req.phone);

        User saved = userRepository.save(user);

        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        Optional<User> userOpt = userRepository.findByEmail(req.email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(req.password)) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(user);
    }
}