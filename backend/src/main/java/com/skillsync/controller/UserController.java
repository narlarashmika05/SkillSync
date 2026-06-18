package com.skillsync.controller;

import com.skillsync.entity.LoginRequest;
import com.skillsync.entity.User;
import com.skillsync.security.JwtUtil;
import com.skillsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {

        Optional<User> user =
                userService.findByEmail(loginRequest.getEmail());

        if (user.isPresent() &&
                user.get().getPassword()
                        .equals(loginRequest.getPassword())) {

            return jwtUtil.generateToken(
                    loginRequest.getEmail()
            );
        }

        return "Invalid Credentials";
    }
    @GetMapping("/profile")
    public String profile() {
        return "Welcome to SkillSync Profile";
    }
}