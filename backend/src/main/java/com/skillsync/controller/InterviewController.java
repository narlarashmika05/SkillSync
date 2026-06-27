package com.skillsync.controller;

import com.skillsync.entity.Interview;
import com.skillsync.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
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
            @RequestBody Interview interview) {

        return interviewService.addInterview(interview);
    }

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/user/{email}")
    public List<Interview> getByUserEmail(
            @PathVariable String email) {

        return interviewService.getByUserEmail(email);
    }
}