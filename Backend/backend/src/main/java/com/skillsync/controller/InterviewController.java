package com.skillsync.controller;

import com.skillsync.entity.Interview;
import com.skillsync.entity.InterviewStats;
import com.skillsync.security.AccessGuard;
import com.skillsync.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin("*")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping
    public Interview addInterview(
            @RequestBody Interview interview,
            Authentication authentication) {

        interview.setUserEmail(authentication.getName());
        return interviewService.addInterview(interview);
    }

    @GetMapping
    public List<Interview> getAllInterviews(Authentication authentication) {
        return interviewService.getByUserEmail(authentication.getName());
    }
    @PutMapping("/{id}")
    public Interview updateInterview(
            @PathVariable Long id,
            @RequestBody Interview interview,
            Authentication authentication) {

        return interviewService.updateInterview(id, interview, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public String deleteInterview(@PathVariable Long id, Authentication authentication) {

        interviewService.deleteInterview(id, authentication.getName());

        return "Interview Deleted Successfully";
    }

    @GetMapping("/stats")
    public InterviewStats getStats(Authentication authentication) {

        return interviewService.getStatsByUserEmail(authentication.getName());
    }

    @GetMapping("/stats/{email}")
    public InterviewStats getStatsByUserEmail(
            @PathVariable String email,
            Authentication authentication) {

        AccessGuard.requireSelf(email, authentication);
        return interviewService.getStatsByUserEmail(email);
    }

    @GetMapping("/user/{email}")
    public List<Interview> getByUserEmail(
            @PathVariable String email,
            Authentication authentication) {

        AccessGuard.requireSelf(email, authentication);
        return interviewService.getByUserEmail(email);
    }
}
