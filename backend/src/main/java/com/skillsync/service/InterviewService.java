package com.skillsync.service;

import com.skillsync.entity.Interview;
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

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public List<Interview> getByUserEmail(
            String email) {

        return interviewRepository.findByUserEmail(email);
    }
}