package com.skillsync.service;

import com.skillsync.entity.DashboardStats;
import com.skillsync.repository.AssessmentRepository;
import com.skillsync.repository.InterviewRepository;
import com.skillsync.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private InterviewRepository interviewRepository;

    public DashboardStats getDashboardStats() {

        DashboardStats stats = new DashboardStats();

        stats.setTotalProblems(
                problemRepository.count()
        );

        stats.setTotalAssessments(
                assessmentRepository.count()
        );

        stats.setTotalInterviews(
                interviewRepository.count()
        );

        return stats;
    }
}