package com.skillsync.controller;

import com.skillsync.entity.User;
import com.skillsync.repository.UserRepository;
import com.skillsync.security.AccessGuard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{email}")
    public User getProfile(@PathVariable String email, Authentication authentication) {
        AccessGuard.requireSelf(email, authentication);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{email}")
    public User updateProfile(@PathVariable String email,
                              @RequestBody User updatedUser,
                              Authentication authentication) {

        AccessGuard.requireSelf(email, authentication);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Email is the login identity (JWT subject and record owner), so it is not editable here.
        user.setName(updatedUser.getName());
        user.setCollege(updatedUser.getCollege());
        user.setBranch(updatedUser.getBranch());

        return userRepository.save(user);
    }
}
