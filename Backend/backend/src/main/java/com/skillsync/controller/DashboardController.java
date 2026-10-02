package com.skillsync.controller;

import com.skillsync.entity.DashboardStats;
import com.skillsync.security.AccessGuard;
import com.skillsync.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/{email}")
    public DashboardStats getDashboardStats(@PathVariable String email, Authentication authentication) {
        AccessGuard.requireSelf(email, authentication);
        return dashboardService.getDashboardStats(email);
    }
}
