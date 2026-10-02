package com.skillsync.controller;

import com.skillsync.entity.Problem;
import com.skillsync.security.AccessGuard;
import com.skillsync.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.skillsync.entity.ProblemStats;
import java.util.List;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin("*")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @PostMapping
    public Problem addProblem(@RequestBody Problem problem, Authentication authentication) {
        problem.setUserEmail(authentication.getName());
        return problemService.addProblem(problem);
    }

    @GetMapping
    public List<Problem> getAllProblems(Authentication authentication) {
        return problemService.getProblemsByUserEmail(authentication.getName());
    }

    @GetMapping("/topic/{topic}")
    public List<Problem> getProblemsByTopic(
            @PathVariable String topic,
            Authentication authentication) {

        return problemService.getProblemsByTopic(topic, authentication.getName());
    }
    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id, Authentication authentication) {

        problemService.deleteProblem(id, authentication.getName());

        return "Problem Deleted Successfully";
    }
    @GetMapping("/stats")
    public ProblemStats getStats(Authentication authentication) {
        return problemService.getStatsByUserEmail(authentication.getName());
    }
    @PutMapping("/{id}")
    public Problem updateProblem(
            @PathVariable Long id,
            @RequestBody Problem problem,
            Authentication authentication) {

        return problemService.updateProblem(id, problem, authentication.getName());
    }
    @GetMapping("/user/{email}")
    public List<Problem> getProblemsByUserEmail(
            @PathVariable String email,
            Authentication authentication) {

        AccessGuard.requireSelf(email, authentication);
        return problemService.getProblemsByUserEmail(email);
    }

    @GetMapping("/stats/{email}")
    public ProblemStats getStatsByUserEmail(@PathVariable String email, Authentication authentication) {
        AccessGuard.requireSelf(email, authentication);
        return problemService.getStatsByUserEmail(email);
    }
}
