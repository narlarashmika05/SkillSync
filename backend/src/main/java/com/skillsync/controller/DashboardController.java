package com.skillsync.controller;

import com.skillsync.entity.DashboardStats;
import com.skillsync.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardStats getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}