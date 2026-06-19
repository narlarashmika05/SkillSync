package com.skillsync.entity;

public class ProblemStats {

    private long totalProblems;
    private long easy;
    private long medium;
    private long hard;

    public long getTotalProblems() {
        return totalProblems;
    }

    public void setTotalProblems(long totalProblems) {
        this.totalProblems = totalProblems;
    }

    public long getEasy() {
        return easy;
    }

    public void setEasy(long easy) {
        this.easy = easy;
    }

    public long getMedium() {
        return medium;
    }

    public void setMedium(long medium) {
        this.medium = medium;
    }

    public long getHard() {
        return hard;
    }

    public void setHard(long hard) {
        this.hard = hard;
    }
}