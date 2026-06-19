package com.skillsync.service;

import com.skillsync.entity.Problem;
import com.skillsync.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    public Problem addProblem(Problem problem) {
        return problemRepository.save(problem);
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public List<Problem> getProblemsByTopic(String topic) {
        return problemRepository.findByTopic(topic);
    }
}