package com.skillsync.controller;
import com.skillsync.entity.Assessment;
import com.skillsync.security.AccessGuard;
import com.skillsync.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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
            @RequestBody Assessment assessment,
            Authentication authentication) {
        assessment.setUserEmail(authentication.getName());
        return assessmentService.addAssessment(assessment);
    }
    @GetMapping
    public List<Assessment> getAllAssessments(Authentication authentication) {
        return assessmentService.getByUserEmail(authentication.getName());
    }
    @GetMapping("/user/{email}")
    public List<Assessment> getByUserEmail(
            @PathVariable String email,
            Authentication authentication) {
        AccessGuard.requireSelf(email, authentication);
        return assessmentService.getByUserEmail(email);
    }
    @PutMapping("/{id}")
    public Assessment updateAssessment(
            @PathVariable Long id,
            @RequestBody Assessment assessment,
            Authentication authentication) {
        return assessmentService.updateAssessment(id, assessment, authentication.getName());
    }
    @DeleteMapping("/{id}")
    public String deleteAssessment(
            @PathVariable Long id,
            Authentication authentication) {
        assessmentService.deleteAssessment(id, authentication.getName());
        return "Assessment Deleted Successfully";
    }
    @GetMapping("/stats")
    public AssessmentStats getStats(Authentication authentication) {
        return assessmentService.getStatsByUserEmail(authentication.getName());
    }
    @GetMapping("/stats/{email}")
    public AssessmentStats getStatsByUserEmail(
            @PathVariable String email,
            Authentication authentication) {
        AccessGuard.requireSelf(email, authentication);
        return assessmentService.getStatsByUserEmail(email);
    }
}
