package com.profolix.resume.service;

import com.profolix.resume.model.*;
import com.profolix.resume.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ProfileRepository profileRepository;
    private final ExperienceRepository experienceRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final EducationRepository educationRepository;
    private final AchievementRepository achievementRepository;

    public ResumeService(ProfileRepository profileRepository, ExperienceRepository experienceRepository,
            SkillRepository skillRepository, ProjectRepository projectRepository,
            EducationRepository educationRepository, AchievementRepository achievementRepository) {
        this.profileRepository = profileRepository;
        this.experienceRepository = experienceRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.educationRepository = educationRepository;
        this.achievementRepository = achievementRepository;
    }

    public Optional<Profile> getProfile() {
        return profileRepository.findFirstByOrderByIdAsc();
    }

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllByOrderBySortOrderAsc();
    }

    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderByCategoryAscProficiencyDesc();
    }

    public Map<String, List<Skill>> getSkillsByCategory() {
        return skillRepository.findAllByOrderByCategoryAscProficiencyDesc()
                .stream()
                .collect(Collectors.groupingBy(Skill::getCategory, LinkedHashMap::new, Collectors.toList()));
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderBySortOrderAsc();
    }

    public List<Project> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrue();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Education> getAllEducation() {
        return educationRepository.findAllByOrderBySortOrderAsc();
    }

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAllByOrderBySortOrderAsc();
    }
}
