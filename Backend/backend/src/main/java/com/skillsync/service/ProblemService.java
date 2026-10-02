package com.skillsync.service;

import com.skillsync.entity.Problem;
import com.skillsync.exception.OwnershipException;
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

    public List<Problem> getProblemsByTopic(String topic, String userEmail) {
        return problemRepository.findByTopicAndUserEmail(topic, userEmail);
    }
    public void deleteProblem(Long id, String requesterEmail) {

        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem Not Found"));

        if (!problem.getUserEmail().equalsIgnoreCase(requesterEmail)) {
            throw new OwnershipException("You do not have permission to delete this problem.");
        }

        problemRepository.deleteById(id);
    }
    public Problem updateProblem(Long id, Problem updatedProblem, String requesterEmail) {

        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem Not Found"));

        if (!problem.getUserEmail().equalsIgnoreCase(requesterEmail)) {
            throw new OwnershipException("You do not have permission to modify this problem.");
        }

        problem.setTitle(updatedProblem.getTitle());
        problem.setTopic(updatedProblem.getTopic());
        problem.setDifficulty(updatedProblem.getDifficulty());
        problem.setStatus(updatedProblem.getStatus());

        return problemRepository.save(problem);
    }
    public List<Problem> getProblemsByUserEmail(
            String userEmail) {

        return problemRepository.findByUserEmail(userEmail);
    }

    public ProblemStats getStatsByUserEmail(String userEmail) {

        List<Problem> problems = problemRepository.findByUserEmail(userEmail);

        ProblemStats stats = new ProblemStats();

        stats.setTotalProblems(problems.size());

        stats.setEasy(
                problems.stream()
                        .filter(p -> p.getDifficulty().equalsIgnoreCase("Easy"))
                        .count()
        );

        stats.setMedium(
                problems.stream()
                        .filter(p -> p.getDifficulty().equalsIgnoreCase("Medium"))
                        .count()
        );

        stats.setHard(
                problems.stream()
                        .filter(p -> p.getDifficulty().equalsIgnoreCase("Hard"))
                        .count()
        );

        return stats;
    }

}