package com.profolix.resume.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String title;
    private String subtitle;
    private String email;
    private String phone;
    private String location;
    private String linkedIn;
    private String github;
    private String portfolio;

    @Column(length = 2000)
    private String bio;

    private String profileImageUrl;
    private int yearsOfExperience;
    private int projectsCompleted;
    private int companiesWorked;
    private int certificationsEarned;

    public Profile() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(String portfolio) {
        this.portfolio = portfolio;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public int getProjectsCompleted() {
        return projectsCompleted;
    }

    public void setProjectsCompleted(int projectsCompleted) {
        this.projectsCompleted = projectsCompleted;
    }

    public int getCompaniesWorked() {
        return companiesWorked;
    }

    public void setCompaniesWorked(int companiesWorked) {
        this.companiesWorked = companiesWorked;
    }

    public int getCertificationsEarned() {
        return certificationsEarned;
    }

    public void setCertificationsEarned(int certificationsEarned) {
        this.certificationsEarned = certificationsEarned;
    }
}
