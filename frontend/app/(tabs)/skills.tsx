import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { resumeApi, Skill } from '../../services/api';
import SkillBar from '../../components/SkillBar';
import SectionHeader from '../../components/SectionHeader';
import AnimatedSection from '../../components/AnimatedSection';
import GlassCard from '../../components/GlassCard';

const CATEGORY_COLORS: Record<string, string> = {
    FRONTEND: '#7C4DFF',
    BACKEND: '#00E5FF',
    DEVOPS: '#FF4081',
    DATABASE: '#FFAB40',
    MOBILE: '#00E676',
    TOOLS: '#84FFFF',
};

const CATEGORY_ICONS: Record<string, string> = {
    FRONTEND: '🎨',
    BACKEND: '⚙️',
    DEVOPS: '🚀',
    DATABASE: '🗄️',
    MOBILE: '📱',
    TOOLS: '🔧',
};

export default function SkillsScreen() {
    const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skill[]>>({});
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            const res = await resumeApi.getSkillsByCategory();
            setSkillsByCategory(res.data);
            const categories = Object.keys(res.data);
            if (categories.length > 0) {
                setActiveCategory(categories[0]);
            }
        } catch (error) {
            console.error('Error loading skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryPress = (category: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setActiveCategory(category);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    const categories = Object.keys(skillsByCategory);
    const activeSkills = skillsByCategory[activeCategory] || [];

    // Calculate category stats
    const totalSkills = Object.values(skillsByCategory).flat().length;
    const avgProficiency = Math.round(
        Object.values(skillsByCategory).flat().reduce((sum, s) => sum + s.proficiency, 0) / totalSkills
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <AnimatedSection delay={100}>
                    <SectionHeader
                        title="🛠️ Technical Skills"
                        subtitle="Technologies I work with daily and continue to master"
                    />
                </AnimatedSection>

                {/* Stats Summary */}
                <AnimatedSection delay={200} style={styles.statsRow}>
                    <GlassCard style={styles.statCard}>
                        <Text style={styles.statValue}>{totalSkills}</Text>
                        <Text style={styles.statLabel}>Total Skills</Text>
                    </GlassCard>
                    <GlassCard style={styles.statCard}>
                        <Text style={[styles.statValue, { color: Colors.secondary }]}>{avgProficiency}%</Text>
                        <Text style={styles.statLabel}>Avg Proficiency</Text>
                    </GlassCard>
                    <GlassCard style={styles.statCard}>
                        <Text style={[styles.statValue, { color: Colors.accent }]}>{categories.length}</Text>
                        <Text style={styles.statLabel}>Categories</Text>
                    </GlassCard>
                </AnimatedSection>

                {/* Category Tabs */}
                <AnimatedSection delay={300}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryTabs}
                    >
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => handleCategoryPress(cat)}
                                    activeOpacity={0.7}
                                >
                                    {isActive ? (
                                        <LinearGradient
                                            colors={[CATEGORY_COLORS[cat] || '#7C4DFF', (CATEGORY_COLORS[cat] || '#7C4DFF') + '80']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.categoryTab, styles.categoryTabActive]}
                                        >
                                            <Text style={styles.categoryIcon}>{CATEGORY_ICONS[cat] || '💡'}</Text>
                                            <Text style={[styles.categoryText, styles.categoryTextActive]}>{cat}</Text>
                                            <View style={styles.categoryCount}>
                                                <Text style={styles.categoryCountText}>{skillsByCategory[cat].length}</Text>
                                            </View>
                                        </LinearGradient>
                                    ) : (
                                        <View style={styles.categoryTab}>
                                            <Text style={styles.categoryIcon}>{CATEGORY_ICONS[cat] || '💡'}</Text>
                                            <Text style={styles.categoryText}>{cat}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </AnimatedSection>

                {/* Skills List */}
                <AnimatedSection delay={400}>
                    <GlassCard gradient gradientColors={[
                        (CATEGORY_COLORS[activeCategory] || '#7C4DFF') + '15',
                        'rgba(0, 0, 0, 0.2)',
                    ]}>
                        <Text style={styles.categoryTitle}>
                            {CATEGORY_ICONS[activeCategory] || '💡'} {activeCategory}
                        </Text>
                        {activeSkills.map((skill, index) => (
                            <SkillBar
                                key={skill.id}
                                name={skill.name}
                                proficiency={skill.proficiency}
                                index={index}
                                color={CATEGORY_COLORS[activeCategory]}
                            />
                        ))}
                    </GlassCard>
                </AnimatedSection>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scrollContent: { padding: Spacing.lg, paddingTop: 60 },
    loadingContainer: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },

    // Stats
    statsRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: Spacing.lg,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.sm,
    },
    statValue: {
        fontSize: FontSizes.xl,
        fontWeight: '800',
        color: Colors.primary,
    },
    statLabel: {
        fontSize: FontSizes.xs,
        color: Colors.textMuted,
        marginTop: 4,
    },

    // Category tabs
    categoryTabs: {
        gap: 8,
        paddingVertical: Spacing.sm,
        marginBottom: Spacing.md,
    },
    categoryTab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.glass,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: BorderRadius.round,
        gap: 6,
    },
    categoryTabActive: {
        borderColor: 'transparent',
    },
    categoryIcon: {
        fontSize: 16,
    },
    categoryText: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: Colors.text,
        fontWeight: '700',
    },
    categoryCount: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryCountText: {
        fontSize: 10,
        color: Colors.text,
        fontWeight: '700',
    },

    // Skills list
    categoryTitle: {
        fontSize: FontSizes.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
});
