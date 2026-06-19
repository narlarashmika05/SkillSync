package com.skillsync.controller;

import com.skillsync.entity.Problem;
import com.skillsync.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Problem addProblem(@RequestBody Problem problem) {
        return problemService.addProblem(problem);
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    @GetMapping("/topic/{topic}")
    public List<Problem> getProblemsByTopic(
            @PathVariable String topic) {

        return problemService.getProblemsByTopic(topic);
    }
    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id) {

        problemService.deleteProblem(id);

        return "Problem Deleted Successfully";
    }
    @GetMapping("/stats")
    public ProblemStats getStats() {
        return problemService.getStats();
    }
}