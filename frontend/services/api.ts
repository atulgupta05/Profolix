import axios from 'axios';
import { Platform } from 'react-native';

// For physical device with Expo Go, use your machine's local IP
// Update this IP if your network changes
const API_BASE_URL = 'http://10.119.135.26:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Profile {
    id: number;
    fullName: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    github: string;
    portfolio: string;
    bio: string;
    profileImageUrl: string;
    yearsOfExperience: number;
    projectsCompleted: number;
    companiesWorked: number;
    certificationsEarned: number;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    technologies: string;
    logoUrl: string;
    current: boolean;
    sortOrder: number;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    iconName: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string;
    imageUrl: string;
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
    sortOrder: number;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    grade: string;
    logoUrl: string;
    sortOrder: number;
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    year: string;
    sortOrder: number;
}

export const resumeApi = {
    getProfile: () => api.get<Profile>('/profile'),
    getExperiences: () => api.get<Experience[]>('/experiences'),
    getSkills: () => api.get<Skill[]>('/skills'),
    getSkillsByCategory: () => api.get<Record<string, Skill[]>>('/skills/categories'),
    getProjects: () => api.get<Project[]>('/projects'),
    getEducation: () => api.get<Education[]>('/education'),
    getAchievements: () => api.get<Achievement[]>('/achievements'),
};

export default api;
