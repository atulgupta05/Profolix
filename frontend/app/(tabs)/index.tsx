import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows, Gradients } from '../../constants/theme';
import { resumeApi, Profile, Achievement, Education } from '../../services/api';
import AnimatedSection from '../../components/AnimatedSection';
import StatCard from '../../components/StatCard';
import GlassCard from '../../components/GlassCard';
import SectionHeader from '../../components/SectionHeader';

export default function HomeScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileRes, achievementsRes, educationRes] = await Promise.all([
        resumeApi.getProfile(),
        resumeApi.getAchievements(),
        resumeApi.getEducation(),
      ]);
      setProfile(profileRes.data);
      setAchievements(achievementsRes.data);
      setEducation(educationRes.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>⚠️ Could not load profile</Text>
        <Text style={styles.errorHint}>Make sure the Spring Boot backend is running on port 8080</Text>
      </View>
    );
  }

  const getAchievementIcon = (icon: string) => {
    const icons: Record<string, string> = {
      cloud: '☁️', verified: '✅', trophy: '🏆', star: '⭐', medal: '🥇', microphone: '🎤',
    };
    return icons[icon] || '🏅';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========= HERO SECTION ========= */}
        <LinearGradient
          colors={['#0A0A1A', '#1A1040', '#0A0A1A']}
          style={styles.heroSection}
        >
          {/* Decorative circles */}
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />

          <AnimatedSection delay={100}>
            {/* Profile Image with Glow Ring */}
            <View style={styles.profileImageContainer}>
              <LinearGradient
                colors={['#7C4DFF', '#00E5FF', '#FF4081']}
                style={styles.imageGlowRing}
              >
                <View style={styles.imageInnerRing}>
                  <Image
                    source={{ uri: profile.profileImageUrl }}
                    style={styles.profileImage}
                  />
                </View>
              </LinearGradient>
            </View>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <Text style={styles.heroName}>{profile.fullName}</Text>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <LinearGradient
              colors={['#7C4DFF', '#00E5FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleBadge}
            >
              <Text style={styles.heroTitle}>{profile.title}</Text>
            </LinearGradient>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <Text style={styles.heroSubtitle}>{profile.subtitle}</Text>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <Text style={styles.locationText}>📍 {profile.location}</Text>
          </AnimatedSection>

          {/* Stats Row */}
          <AnimatedSection delay={700} style={styles.statsRow}>
            <StatCard label="Years Exp" value={profile.yearsOfExperience} icon="💼" delay={800} />
            <StatCard label="Projects" value={profile.projectsCompleted} icon="🚀" delay={900}
              gradientColors={['rgba(0, 229, 255, 0.2)', 'rgba(124, 77, 255, 0.1)']} />
            <StatCard label="Companies" value={profile.companiesWorked} icon="🏢" delay={1000}
              gradientColors={['rgba(255, 64, 129, 0.2)', 'rgba(124, 77, 255, 0.1)']} />
          </AnimatedSection>
        </LinearGradient>

        {/* ========= ABOUT SECTION ========= */}
        <View style={styles.section}>
          <AnimatedSection delay={200}>
            <SectionHeader title="About Me" subtitle="" />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <GlassCard gradient>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </GlassCard>
          </AnimatedSection>
        </View>

        {/* ========= EDUCATION SECTION ========= */}
        <View style={styles.section}>
          <AnimatedSection delay={200}>
            <SectionHeader title="🎓 Education" />
          </AnimatedSection>
          {education.map((edu, index) => (
            <AnimatedSection key={edu.id} delay={300 + index * 150}>
              <GlassCard>
                <View style={styles.eduHeader}>
                  <Image source={{ uri: edu.logoUrl }} style={styles.eduLogo} />
                  <View style={styles.eduInfo}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduField}>{edu.field}</Text>
                    <Text style={styles.eduInstitution}>{edu.institution}</Text>
                    <View style={styles.eduMeta}>
                      <Text style={styles.eduYear}>📅 {edu.startYear} — {edu.endYear}</Text>
                      {edu.grade && <Text style={styles.eduGrade}>🎯 {edu.grade}</Text>}
                    </View>
                  </View>
                </View>
              </GlassCard>
            </AnimatedSection>
          ))}
        </View>

        {/* ========= ACHIEVEMENTS SECTION ========= */}
        <View style={styles.section}>
          <AnimatedSection delay={200}>
            <SectionHeader title="🏆 Achievements" />
          </AnimatedSection>
          {achievements.map((item, index) => (
            <AnimatedSection key={item.id} delay={300 + index * 120}>
              <GlassCard gradient gradientColors={
                index % 2 === 0
                  ? ['rgba(124, 77, 255, 0.15)', 'rgba(0, 229, 255, 0.08)']
                  : ['rgba(255, 64, 129, 0.12)', 'rgba(124, 77, 255, 0.08)']
              }>
                <View style={styles.achieveRow}>
                  <Text style={styles.achieveIcon}>{getAchievementIcon(item.icon)}</Text>
                  <View style={styles.achieveContent}>
                    <Text style={styles.achieveTitle}>{item.title}</Text>
                    <Text style={styles.achieveDesc}>{item.description}</Text>
                    <Text style={styles.achieveYear}>{item.year}</Text>
                  </View>
                </View>
              </GlassCard>
            </AnimatedSection>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 16,
    fontSize: FontSizes.md,
  },
  errorText: {
    color: Colors.accent,
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  errorHint: {
    color: Colors.textMuted,
    fontSize: FontSizes.sm,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  // Hero
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(124, 77, 255, 0.08)',
    top: -40,
    right: -60,
  },
  decorCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 229, 255, 0.06)',
    bottom: -20,
    left: -40,
  },
  profileImageContainer: {
    marginBottom: Spacing.lg,
    ...Shadows.glow,
  },
  imageGlowRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    padding: 4,
  },
  imageInnerRing: {
    flex: 1,
    borderRadius: 68,
    backgroundColor: Colors.background,
    padding: 3,
  },
  profileImage: {
    flex: 1,
    borderRadius: 65,
  },
  heroName: {
    fontSize: FontSizes.hero,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  titleBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: BorderRadius.round,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  locationText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginTop: Spacing.sm,
  },

  // Section
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },

  // Bio
  bioText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  // Education
  eduHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eduLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: Colors.surfaceLight,
  },
  eduInfo: {
    flex: 1,
  },
  eduDegree: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  eduField: {
    fontSize: FontSizes.md,
    color: Colors.primaryLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  eduInstitution: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  eduMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  eduYear: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  eduGrade: {
    fontSize: FontSizes.xs,
    color: Colors.secondary,
    fontWeight: '600',
  },

  // Achievements
  achieveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achieveIcon: {
    fontSize: 32,
    marginRight: 14,
    marginTop: 2,
  },
  achieveContent: {
    flex: 1,
  },
  achieveTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  achieveDesc: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  achieveYear: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
});
