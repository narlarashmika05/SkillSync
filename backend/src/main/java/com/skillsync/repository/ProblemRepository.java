package com.skillsync.repository;

import com.skillsync.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository
        extends JpaRepository<Problem, Long> {

    List<Problem> findByTopic(String topic);
}