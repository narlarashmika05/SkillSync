package com.skillsync.controller;

import com.skillsync.entity.Assessment;
import com.skillsync.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.skillsync.entity.AssessmentStats;
import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin("*")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping
    public Assessment addAssessment(
            @RequestBody Assessment assessment) {

        return assessmentService.addAssessment(assessment);
    }

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentService.getAllAssessments();
    }

    @GetMapping("/user/{email}")
    public List<Assessment> getByUserEmail(
            @PathVariable String email) {

        return assessmentService.getByUserEmail(email);
    }
    @GetMapping("/stats")
    public AssessmentStats getStats() {
        return assessmentService.getStats();
    }
}