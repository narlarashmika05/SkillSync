package com.skillsync.service;

import com.skillsync.entity.Problem;
import com.skillsync.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.skillsync.entity.ProblemStats;
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
    public void deleteProblem(Long id) {
        problemRepository.deleteById(id);
    }
    public ProblemStats getStats() {

        ProblemStats stats = new ProblemStats();

        stats.setTotalProblems(
                problemRepository.count()
        );

        stats.setEasy(
                problemRepository.findAll()
                        .stream()
                        .filter(p -> p.getDifficulty()
                                .equalsIgnoreCase("Easy"))
                        .count()
        );

        stats.setMedium(
                problemRepository.findAll()
                        .stream()
                        .filter(p -> p.getDifficulty()
                                .equalsIgnoreCase("Medium"))
                        .count()
        );

        stats.setHard(
                problemRepository.findAll()
                        .stream()
                        .filter(p -> p.getDifficulty()
                                .equalsIgnoreCase("Hard"))
                        .count()
        );

        return stats;
    }
    public List<Problem> getProblemsByUserEmail(
            String userEmail) {

        return problemRepository.findByUserEmail(userEmail);
    }

}