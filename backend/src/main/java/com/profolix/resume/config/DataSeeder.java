package com.profolix.resume.config;

import com.profolix.resume.model.*;
import com.profolix.resume.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

        private final ProfileRepository profileRepository;
        private final ExperienceRepository experienceRepository;
        private final SkillRepository skillRepository;
        private final ProjectRepository projectRepository;
        private final EducationRepository educationRepository;
        private final AchievementRepository achievementRepository;

        public DataSeeder(ProfileRepository profileRepository, ExperienceRepository experienceRepository,
                        SkillRepository skillRepository, ProjectRepository projectRepository,
                        EducationRepository educationRepository, AchievementRepository achievementRepository) {
                this.profileRepository = profileRepository;
                this.experienceRepository = experienceRepository;
                this.skillRepository = skillRepository;
                this.projectRepository = projectRepository;
                this.educationRepository = educationRepository;
                this.achievementRepository = achievementRepository;
        }

        @Override
        public void run(String... args) {
                if (profileRepository.count() > 0)
                        return;

                seedProfile();
                seedExperiences();
                seedSkills();
                seedProjects();
                seedEducation();
                seedAchievements();

                System.out.println("✅ Database seeded with Atul Gupta's resume data!");
        }

        private void seedProfile() {
                Profile p = new Profile();
                p.setFullName("Atul Ajit Gupta");
                p.setTitle("React Native & MERN Stack Developer");
                p.setSubtitle("Building scalable, secure & user-friendly applications");
                p.setEmail("gptatul007@gmail.com");
                p.setPhone("+91 8707512141");
                p.setLocation("Nagpur, Maharashtra, India");
                p.setLinkedIn("https://linkedin.com/in/atul-a-gupta");
                p.setGithub("https://github.com/atulgupta05");
                p.setPortfolio("https://atul-portfolio.pages.dev/");
                p.setBio("Cross-Platform Mobile & MERN Stack Developer with 2.5+ years of experience building scalable, secure, and user-friendly web and mobile-ready applications. Proficient in React Native, React.js, Node.js, Express.js, MongoDB, and Spring Boot. Experienced in full application lifecycle development, RESTful API design, database optimization, debugging, and Agile collaboration. Passionate about delivering high-quality mobile and web solutions.");
                p.setProfileImageUrl(
                                "https://ui-avatars.com/api/?name=Atul+Gupta&background=7C4DFF&color=fff&size=300&font-size=0.35&bold=true");
                p.setYearsOfExperience(2);
                p.setProjectsCompleted(5);
                p.setCompaniesWorked(2);
                p.setCertificationsEarned(3);
                profileRepository.save(p);
        }

        private void seedExperiences() {
                Experience e1 = new Experience();
                e1.setCompany("Stoic & Salamander Corporation Pvt. Ltd.");
                e1.setRole("React Native & MERN Stack Developer");
                e1.setStartDate("Jun 2025");
                e1.setEndDate("Present");
                e1.setLocation("Pune, India");
                e1.setDescription(
                                "Contributing to mobile-ready and cross-platform application development using React Native concepts. Working on reusable business logic shared across web and mobile platforms. Developing scalable web applications using MongoDB, Express.js, React.js, and Node.js. Designing and implementing RESTful APIs and integrating with frontend for seamless workflows. Collaborating with cross-functional teams to deliver secure and efficient enterprise solutions.");
                e1.setTechnologies("React Native, React.js, Node.js, Express.js, MongoDB, REST APIs");
                e1.setLogoUrl("https://ui-avatars.com/api/?name=SS&background=6C63FF&color=fff&size=64");
                e1.setCurrent(true);
                e1.setSortOrder(1);
                experienceRepository.save(e1);

                Experience e2 = new Experience();
                e2.setCompany("Webdroid Edutech LLP");
                e2.setRole("Junior Full Stack Developer (MERN + React Native + Spring Boot)");
                e2.setStartDate("Aug 2023");
                e2.setEndDate("Apr 2025");
                e2.setLocation("Nagpur, India");
                e2.setDescription(
                                "Contributed to mobile-ready and cross-platform application development using React Native concepts. Worked on reusable business logic shared across web and mobile platforms. Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Designed and implemented REST APIs using Node.js and Express.js for seamless data flow. Collaborated in Agile teams to deliver robust and scalable applications.");
                e2.setTechnologies(
                                "React Native, React.js, Node.js, Express.js, MongoDB, Spring Boot, REST APIs, Agile");
                e2.setLogoUrl("https://ui-avatars.com/api/?name=WE&background=00C9A7&color=fff&size=64");
                e2.setCurrent(false);
                e2.setSortOrder(2);
                experienceRepository.save(e2);
        }

        private void seedSkills() {
                // Frontend
                skillRepository.save(new Skill("React.js", "FRONTEND", 90, "react"));
                skillRepository.save(new Skill("JavaScript", "FRONTEND", 88, "javascript"));
                skillRepository.save(new Skill("HTML5", "FRONTEND", 92, "html5"));
                skillRepository.save(new Skill("CSS3", "FRONTEND", 90, "css3"));
                skillRepository.save(new Skill("Ant Design", "FRONTEND", 80, "antdesign"));

                // Mobile
                skillRepository.save(new Skill("React Native", "MOBILE", 85, "react"));
                skillRepository.save(new Skill("Cross-Platform Development", "MOBILE", 82, "mobile"));

                // Backend
                skillRepository.save(new Skill("Node.js", "BACKEND", 88, "nodejs"));
                skillRepository.save(new Skill("Express.js", "BACKEND", 87, "express"));
                skillRepository.save(new Skill("REST APIs", "BACKEND", 90, "api"));
                skillRepository.save(new Skill("Spring Boot", "BACKEND", 75, "spring"));

                // Database
                skillRepository.save(new Skill("MongoDB", "DATABASE", 88, "mongodb"));
                skillRepository.save(new Skill("SQL", "DATABASE", 80, "sql"));
                skillRepository.save(new Skill("SQLite", "DATABASE", 75, "sqlite"));

                // Languages
                skillRepository.save(new Skill("Java", "LANGUAGES", 78, "java"));
                skillRepository.save(new Skill("C++", "LANGUAGES", 72, "cpp"));
                skillRepository.save(new Skill("C", "LANGUAGES", 70, "c"));
        }

        private void seedProjects() {
                Project p1 = new Project();
                p1.setTitle("Expense Management System");
                p1.setDescription(
                                "Full-stack expense management application with CRUD functionalities and optimized MongoDB queries. Built with MERN stack and Ant Design for a polished, professional UI. Features include expense tracking, category filtering, and data visualization.");
                p1.setTechnologies("React.js, Node.js, Express.js, MongoDB, Ant Design");
                p1.setImageUrl("https://picsum.photos/seed/expense/800/500");
                p1.setLiveUrl("");
                p1.setGithubUrl("https://github.com/atulgupta05");
                p1.setFeatured(true);
                p1.setSortOrder(1);
                projectRepository.save(p1);

                Project p2 = new Project();
                p2.setTitle("Food Ordering App");
                p2.setDescription(
                                "End-to-end food ordering platform with user authentication and order management. Features include menu browsing, cart functionality, secure checkout, and real-time order tracking.");
                p2.setTechnologies("React.js, Node.js, Express.js, MongoDB");
                p2.setImageUrl("https://picsum.photos/seed/foodapp/800/500");
                p2.setLiveUrl("");
                p2.setGithubUrl("https://github.com/atulgupta05");
                p2.setFeatured(true);
                p2.setSortOrder(2);
                projectRepository.save(p2);

                Project p3 = new Project();
                p3.setTitle("Product Stock Collection App");
                p3.setDescription(
                                "Stock management tool for tracking product inventories. Provides real-time inventory updates, low-stock alerts, and comprehensive reporting dashboards for efficient stock control.");
                p3.setTechnologies("React.js, Node.js, Express.js, MongoDB");
                p3.setImageUrl("https://picsum.photos/seed/stockapp/800/500");
                p3.setLiveUrl("");
                p3.setGithubUrl("https://github.com/atulgupta05");
                p3.setFeatured(true);
                p3.setSortOrder(3);
                projectRepository.save(p3);

                Project p4 = new Project();
                p4.setTitle("Real-Estate Web Page");
                p4.setDescription(
                                "Fully responsive and interactive real-estate webpage built with React. Features property listings, search filters, image galleries, and smooth animations for an engaging user experience.");
                p4.setTechnologies("React.js, CSS3, Responsive Design");
                p4.setImageUrl("https://picsum.photos/seed/realestate/800/500");
                p4.setLiveUrl("");
                p4.setGithubUrl("https://github.com/atulgupta05");
                p4.setFeatured(false);
                p4.setSortOrder(4);
                projectRepository.save(p4);

                Project p5 = new Project();
                p5.setTitle("Fitness-Club Web Page");
                p5.setDescription(
                                "Responsive and user-friendly design for a fitness club website. Showcases membership plans, trainer profiles, class schedules, and a modern UI with smooth transitions.");
                p5.setTechnologies("React.js, CSS3, Responsive Design");
                p5.setImageUrl("https://picsum.photos/seed/fitnessclub/800/500");
                p5.setLiveUrl("");
                p5.setGithubUrl("https://github.com/atulgupta05");
                p5.setFeatured(false);
                p5.setSortOrder(5);
                projectRepository.save(p5);
        }

        private void seedEducation() {
                Education ed1 = new Education();
                ed1.setInstitution("Priyadarshini College of Engineering, Nagpur");
                ed1.setDegree("Bachelor of Engineering");
                ed1.setField("Information Technology");
                ed1.setStartYear("2019");
                ed1.setEndYear("2023");
                ed1.setGrade("8.8 CGPA");
                ed1.setLogoUrl("https://ui-avatars.com/api/?name=PCE&background=1A237E&color=fff&size=64");
                ed1.setSortOrder(1);
                educationRepository.save(ed1);

                Education ed2 = new Education();
                ed2.setInstitution("Guru Nanak College of Science, Ballarpur");
                ed2.setDegree("Higher Secondary");
                ed2.setField("Computer Science");
                ed2.setStartYear("2017");
                ed2.setEndYear("2019");
                ed2.setGrade("65.08%");
                ed2.setLogoUrl("https://ui-avatars.com/api/?name=GNC&background=0D47A1&color=fff&size=64");
                ed2.setSortOrder(2);
                educationRepository.save(ed2);

                Education ed3 = new Education();
                ed3.setInstitution("Adarsh HSS Sahatwar, Ballia");
                ed3.setDegree("Secondary Education");
                ed3.setField("General Studies");
                ed3.setStartYear("2014");
                ed3.setEndYear("2016");
                ed3.setGrade("74%");
                ed3.setLogoUrl("https://ui-avatars.com/api/?name=AHS&background=283593&color=fff&size=64");
                ed3.setSortOrder(3);
                educationRepository.save(ed3);
        }

        private void seedAchievements() {
                saveAchievement("ReactJS for Frontend Development",
                                "Udemy Certification — Comprehensive React.js course covering hooks, state management, routing, and component architecture.",
                                "verified", "Sep 2024", 1);
                saveAchievement("SQL for Data Analytics",
                                "Udemy Certification — In-depth SQL course covering queries, joins, subqueries, and data analytics techniques.",
                                "verified", "Oct 2022", 2);
                saveAchievement("Java Programming",
                                "Udemy Certification — Core Java programming course covering OOP concepts, data structures, and application development.",
                                "verified", "Jul 2022", 3);
        }

        private void saveAchievement(String title, String description, String icon, String year, int sortOrder) {
                Achievement a = new Achievement();
                a.setTitle(title);
                a.setDescription(description);
                a.setIcon(icon);
                a.setYear(year);
                a.setSortOrder(sortOrder);
                achievementRepository.save(a);
        }
}
