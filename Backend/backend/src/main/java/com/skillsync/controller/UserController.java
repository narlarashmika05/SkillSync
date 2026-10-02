package com.skillsync.controller;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.skillsync.entity.LoginRequest;
import com.skillsync.entity.User;
import com.skillsync.security.JwtUtil;
import com.skillsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This email is already registered.");
        }

        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        Optional<User> user =
                userService.findByEmail(loginRequest.getEmail());

        if (user.isPresent() &&
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.get().getPassword()
                )) {

            return ResponseEntity.ok(
                    jwtUtil.generateToken(loginRequest.getEmail())
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Credentials");
    }
}