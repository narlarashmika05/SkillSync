package com.skillsync.repository;

import com.skillsync.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository
        extends JpaRepository<Problem, Long> {

    List<Problem> findByTopicAndUserEmail(String topic, String userEmail);
    List<Problem> findByUserEmail(String userEmail);
}