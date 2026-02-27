import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity,
    ActivityIndicator, StatusBar, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { resumeApi, Experience } from '../../services/api';
import TimelineItem from '../../components/TimelineItem';
import SectionHeader from '../../components/SectionHeader';
import AnimatedSection from '../../components/AnimatedSection';

export default function ExperienceScreen() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        try {
            const res = await resumeApi.getExperiences();
            setExperiences(res.data);
        } catch (error) {
            console.error('Error loading experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <AnimatedSection delay={100} style={styles.header}>
                    <SectionHeader
                        title="💼 Work Experience"
                        subtitle="My professional journey through the years"
                    />
                </AnimatedSection>

                {experiences.map((exp, index) => (
                    <TimelineItem
                        key={exp.id}
                        item={exp}
                        index={index}
                        onPress={setSelectedExp}
                        isLast={index === experiences.length - 1}
                    />
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* ===== EXPERIENCE DETAIL MODAL ===== */}
            <Modal
                visible={!!selectedExp}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setSelectedExp(null)}
            >
                {selectedExp && (
                    <View style={styles.modalContainer}>
                        <LinearGradient
                            colors={['#1A1040', '#0A0A1A']}
                            style={styles.modalContent}
                        >
                            {/* Close Button */}
                            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedExp(null)}>
                                <Ionicons name="close-circle" size={32} color={Colors.textSecondary} />
                            </TouchableOpacity>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
                                {/* Header */}
                                {selectedExp.current && (
                                    <LinearGradient
                                        colors={['#7C4DFF', '#00E5FF']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.modalCurrentBadge}
                                    >
                                        <Text style={styles.modalCurrentText}>🔥 Currently Working Here</Text>
                                    </LinearGradient>
                                )}

                                <Text style={styles.modalRole}>{selectedExp.role}</Text>
                                <Text style={styles.modalCompany}>{selectedExp.company}</Text>

                                <View style={styles.modalMeta}>
                                    <View style={styles.metaItem}>
                                        <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
                                        <Text style={styles.metaText}>
                                            {selectedExp.startDate} — {selectedExp.endDate}
                                        </Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Ionicons name="location-outline" size={16} color={Colors.secondary} />
                                        <Text style={styles.metaText}>{selectedExp.location}</Text>
                                    </View>
                                </View>

                                {/* Description */}
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalSectionTitle}>📝 Responsibilities & Achievements</Text>
                                    <Text style={styles.modalDescription}>{selectedExp.description}</Text>
                                </View>

                                {/* Technologies */}
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalSectionTitle}>🛠️ Technologies Used</Text>
                                    <View style={styles.modalTags}>
                                        {selectedExp.technologies.split(',').map((tech, i) => (
                                            <LinearGradient
                                                key={i}
                                                colors={['rgba(124, 77, 255, 0.25)', 'rgba(0, 229, 255, 0.15)']}
                                                style={styles.modalTag}
                                            >
                                                <Text style={styles.modalTagText}>{tech.trim()}</Text>
                                            </LinearGradient>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                        </LinearGradient>
                    </View>
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scrollContent: { padding: Spacing.lg, paddingTop: 60 },
    loadingContainer: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
    header: { marginBottom: Spacing.lg },

    // Modal
    modalContainer: { flex: 1, backgroundColor: Colors.background },
    modalContent: { flex: 1 },
    modalScroll: { padding: Spacing.lg, paddingTop: 60 },
    closeBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10, padding: 8 },
    modalCurrentBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: BorderRadius.round,
        marginBottom: Spacing.md,
    },
    modalCurrentText: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: '700' },
    modalRole: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.text, marginBottom: 4 },
    modalCompany: { fontSize: FontSizes.xl, color: Colors.primaryLight, fontWeight: '600', marginBottom: Spacing.md },
    modalMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: Spacing.xl },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { color: Colors.textSecondary, fontSize: FontSizes.sm },
    modalSection: { marginBottom: Spacing.xl },
    modalSectionTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
    modalDescription: { fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 26 },
    modalTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    modalTag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.md },
    modalTagText: { color: Colors.primaryLight, fontSize: FontSizes.sm, fontWeight: '600' },
});
