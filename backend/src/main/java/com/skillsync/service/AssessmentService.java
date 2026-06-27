package com.skillsync.service;
import com.skillsync.entity.AssessmentStats;
import com.skillsync.entity.Assessment;
import com.skillsync.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    public Assessment addAssessment(
            Assessment assessment) {

        return assessmentRepository.save(assessment);
    }

    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    public List<Assessment> getByUserEmail(
            String email) {

        return assessmentRepository.findByUserEmail(email);
    }
    public AssessmentStats getStats() {

        AssessmentStats stats = new AssessmentStats();

        var assessments = assessmentRepository.findAll();

        stats.setTotalAssessments(assessments.size());

        int totalScore = assessments.stream()
                .mapToInt(Assessment::getScore)
                .sum();

        int totalMarks = assessments.stream()
                .mapToInt(Assessment::getTotalMarks)
                .sum();

        stats.setTotalScore(totalScore);
        stats.setTotalMarks(totalMarks);

        if (totalMarks > 0) {
            stats.setAveragePercentage(
                    (double) totalScore / totalMarks * 100
            );
        }

        return stats;
    }
}