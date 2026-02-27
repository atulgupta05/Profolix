package com.profolix.resume.controller;

import com.profolix.resume.model.*;
import com.profolix.resume.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        return resumeService.getProfile()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/experiences")
    public ResponseEntity<List<Experience>> getExperiences() {
        return ResponseEntity.ok(resumeService.getAllExperiences());
    }

    @GetMapping("/experiences/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable Long id) {
        return resumeService.getExperienceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(resumeService.getAllSkills());
    }

    @GetMapping("/skills/categories")
    public ResponseEntity<Map<String, List<Skill>>> getSkillsByCategory() {
        return ResponseEntity.ok(resumeService.getSkillsByCategory());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(resumeService.getAllProjects());
    }

    @GetMapping("/projects/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        return ResponseEntity.ok(resumeService.getFeaturedProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return resumeService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/education")
    public ResponseEntity<List<Education>> getEducation() {
        return ResponseEntity.ok(resumeService.getAllEducation());
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<Achievement>> getAchievements() {
        return ResponseEntity.ok(resumeService.getAllAchievements());
    }
}
