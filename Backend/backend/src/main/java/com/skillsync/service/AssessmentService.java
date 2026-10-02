package com.skillsync.service;
import com.skillsync.entity.AssessmentStats;
import com.skillsync.entity.Assessment;
import com.skillsync.exception.OwnershipException;
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

    public List<Assessment> getByUserEmail(
            String email) {

        return assessmentRepository.findByUserEmail(email);
    }
    public Assessment updateAssessment(Long id, Assessment updatedAssessment, String requesterEmail) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment Not Found"));

        if (!assessment.getUserEmail().equalsIgnoreCase(requesterEmail)) {
            throw new OwnershipException("You do not have permission to modify this assessment.");
        }

        assessment.setTitle(updatedAssessment.getTitle());
        assessment.setScore(updatedAssessment.getScore());
        assessment.setTotalMarks(updatedAssessment.getTotalMarks());

        return assessmentRepository.save(assessment);
    }

    public void deleteAssessment(Long id, String requesterEmail) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment Not Found"));

        if (!assessment.getUserEmail().equalsIgnoreCase(requesterEmail)) {
            throw new OwnershipException("You do not have permission to delete this assessment.");
        }

        assessmentRepository.deleteById(id);

    }
    public AssessmentStats getStatsByUserEmail(String email) {

        return buildStats(assessmentRepository.findByUserEmail(email));
    }

    private AssessmentStats buildStats(List<Assessment> assessments) {

        AssessmentStats stats = new AssessmentStats();

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