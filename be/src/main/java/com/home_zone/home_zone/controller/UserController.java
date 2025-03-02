package com.home_zone.home_zone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.home_zone.home_zone.model.User;
import com.home_zone.home_zone.repository.UserRepository;
import com.home_zone.home_zone.service.EmailService;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }

        System.out.println(email);

        User user = userRepository.findByEmail(email);
        System.out.println(userRepository.findByEmail(email.trim()));
        if (user == null) {
            return ResponseEntity.badRequest().body("Email not found.");
        }

        System.out.println("Looking for user with email: " + user.getEmail());

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        userRepository.save(user);

        try {
            emailService.sendResetPasswordEmail(user.getEmail(), token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error sending email: " + e.getMessage());
        }

        return ResponseEntity.ok("Reset link sent to your email.");
    }



    @PostMapping("/sign-up")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        User user1 = new User();
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setPhoneNumber(user.getPhoneNumber());
        user1.setName(user.getName());


        userRepository.save(user1);
        return ResponseEntity.ok("Reset link sent to your email.");
    }

     @PostMapping("/login")
     public ResponseEntity<String> login(@RequestBody User user) {
         User existingUser = userRepository.findByEmail(user.getEmail());
 
         if (existingUser != null ) {
             if (existingUser.getPassword().equals(user.getPassword())) {
                 return ResponseEntity.ok("Login successful!");
             } else {
                 return ResponseEntity.status(401).body("Invalid password.");
             }
         } else {
             return ResponseEntity.status(404).body("User not found.");
         }
     }

}
