package com.skillsync.service;
import com.skillsync.entity.InterviewStats;
import com.skillsync.entity.Interview;
import com.skillsync.exception.OwnershipException;
import com.skillsync.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    public Interview addInterview(
            Interview interview) {

        return interviewRepository.save(interview);
    }

    public List<Interview> getByUserEmail(
            String email) {

        return interviewRepository.findByUserEmail(email);
    }
    public Interview updateInterview(
            Long id,
            Interview updatedInterview,
            String requesterEmail) {

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Interview Not Found"));

        if (!interview.getUserEmail().equalsIgnoreCase(requesterEmail)) {
            throw new OwnershipException("You do not have permission to modify this interview.");
        }

        interview.setCompany(updatedInterview.getCompany());
        interview.setRole(updatedInterview.getRole());
        interview.setInterviewDate(updatedInterview.getInterviewDate());
        interview.setStatus(updatedInterview.getStatus());
        interview.setFeedback(updatedInterview.getFeedback());
        interview.setRating(updatedInterview.getRating());

        return interviewRepository.save(interview);
    }

    public void deleteInterview(Long id, String requesterEmail) {

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Interview Not Found"));

        if (!interview.getUserEmail().equalsIgnoreCase(requesterEmail)) {
            throw new OwnershipException("You do not have permission to delete this interview.");
        }

        interviewRepository.deleteById(id);

    }

    public InterviewStats getStatsByUserEmail(String email) {

        return buildStats(interviewRepository.findByUserEmail(email));
    }

    private InterviewStats buildStats(List<Interview> interviews) {

        InterviewStats stats = new InterviewStats();

        stats.setTotalInterviews(interviews.size());

        if (!interviews.isEmpty()) {

            double average = interviews.stream()
                    .mapToInt(Interview::getRating)
                    .average()
                    .orElse(0);

            stats.setAverageRating(average);
        }

        return stats;
    }
}