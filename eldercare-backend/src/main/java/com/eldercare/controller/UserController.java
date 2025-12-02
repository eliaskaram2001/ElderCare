package com.eldercare.controller;

import com.eldercare.dto.UpdateProfileRequest;
import com.eldercare.model.User;
import com.eldercare.model.UserRole;
import com.eldercare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE PROFILE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id,
                                        @RequestBody UpdateProfileRequest req) {

        return userRepository.findById(id).map(user -> {

            user.setFullName(req.fullName);
            user.setLocation(req.location);
            user.setBio(req.bio);
            user.setPhone(req.phone);
            user.setAge(req.age);

            User updated = userRepository.save(user);
            return ResponseEntity.ok(updated);

        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // LIST ALL PROVIDERS
    @GetMapping("/providers")
    public List<User> getProviders() {
        return userRepository.findByRole(UserRole.PROVIDER);
    }
}
