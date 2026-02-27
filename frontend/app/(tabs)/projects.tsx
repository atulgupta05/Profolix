import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, FlatList, Modal,
    TouchableOpacity, Image, ActivityIndicator, StatusBar, Dimensions, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { resumeApi, Project } from '../../services/api';
import ProjectCard from '../../components/ProjectCard';
import SectionHeader from '../../components/SectionHeader';
import AnimatedSection from '../../components/AnimatedSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProjectsScreen() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await resumeApi.getProjects();
            setProjects(res.data);
        } catch (error) {
            console.error('Error loading projects:', error);
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

    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <AnimatedSection delay={100}>
                    <SectionHeader
                        title="🚀 Projects"
                        subtitle="A showcase of my best work and side projects"
                    />
                </AnimatedSection>

                {/* Featured Projects — Horizontal Carousel */}
                {featuredProjects.length > 0 && (
                    <>
                        <AnimatedSection delay={200}>
                            <Text style={styles.subSectionTitle}>⭐ Featured Projects</Text>
                        </AnimatedSection>
                        <FlatList
                            data={featuredProjects}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.carousel}
                            keyExtractor={(item) => item.id.toString()}
                            snapToInterval={SCREEN_WIDTH * 0.78 + 16}
                            decelerationRate="fast"
                            renderItem={({ item, index }) => (
                                <ProjectCard item={item} index={index} onPress={setSelectedProject} />
                            )}
                        />
                    </>
                )}

                {/* Other Projects — Vertical List */}
                {otherProjects.length > 0 && (
                    <>
                        <AnimatedSection delay={300}>
                            <Text style={[styles.subSectionTitle, { marginTop: Spacing.lg }]}>
                                📂 More Projects
                            </Text>
                        </AnimatedSection>
                        {otherProjects.map((project, index) => (
                            <AnimatedSection key={project.id} delay={400 + index * 100}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setSelectedProject(project)}
                                >
                                    <LinearGradient
                                        colors={['rgba(255, 64, 129, 0.1)', 'rgba(124, 77, 255, 0.06)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.listCard}
                                    >
                                        <Image source={{ uri: project.imageUrl }} style={styles.listImage} />
                                        <View style={styles.listContent}>
                                            <Text style={styles.listTitle} numberOfLines={1}>{project.title}</Text>
                                            <Text style={styles.listDesc} numberOfLines={2}>{project.description}</Text>
                                            <View style={styles.listTags}>
                                                {project.technologies.split(',').slice(0, 3).map((t, i) => (
                                                    <Text key={i} style={styles.listTag}>{t.trim()}</Text>
                                                ))}
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </AnimatedSection>
                        ))}
                    </>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* ===== PROJECT DETAIL MODAL ===== */}
            <Modal
                visible={!!selectedProject}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setSelectedProject(null)}
            >
                {selectedProject && (
                    <View style={styles.modalContainer}>
                        <LinearGradient colors={['#1A1040', '#0A0A1A']} style={styles.modalContent}>
                            {/* Close */}
                            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedProject(null)}>
                                <Ionicons name="close-circle" size={32} color={Colors.textSecondary} />
                            </TouchableOpacity>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
                                {/* Image */}
                                <Image source={{ uri: selectedProject.imageUrl }} style={styles.modalImage} />

                                {selectedProject.featured && (
                                    <LinearGradient
                                        colors={['#FF4081', '#FF6E40']}
                                        style={styles.modalFeaturedBadge}
                                    >
                                        <Text style={styles.modalFeaturedText}>⭐ Featured Project</Text>
                                    </LinearGradient>
                                )}

                                <Text style={styles.modalTitle}>{selectedProject.title}</Text>
                                <Text style={styles.modalDescription}>{selectedProject.description}</Text>

                                {/* Tech Stack */}
                                <Text style={styles.modalSectionTitle}>🛠️ Technologies</Text>
                                <View style={styles.modalTags}>
                                    {selectedProject.technologies.split(',').map((tech, i) => (
                                        <LinearGradient
                                            key={i}
                                            colors={['rgba(124, 77, 255, 0.25)', 'rgba(0, 229, 255, 0.15)']}
                                            style={styles.modalTag}
                                        >
                                            <Text style={styles.modalTagText}>{tech.trim()}</Text>
                                        </LinearGradient>
                                    ))}
                                </View>

                                {/* Links */}
                                <Text style={styles.modalSectionTitle}>🔗 Links</Text>
                                <View style={styles.linksRow}>
                                    {selectedProject.liveUrl && (
                                        <TouchableOpacity
                                            style={styles.linkBtn}
                                            onPress={() => Linking.openURL(selectedProject.liveUrl)}
                                        >
                                            <LinearGradient
                                                colors={['#7C4DFF', '#448AFF']}
                                                style={styles.linkGradient}
                                            >
                                                <Ionicons name="globe-outline" size={18} color="#FFF" />
                                                <Text style={styles.linkText}>Live Demo</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <TouchableOpacity
                                            style={styles.linkBtn}
                                            onPress={() => Linking.openURL(selectedProject.githubUrl)}
                                        >
                                            <LinearGradient
                                                colors={['#333', '#555']}
                                                style={styles.linkGradient}
                                            >
                                                <Ionicons name="logo-github" size={18} color="#FFF" />
                                                <Text style={styles.linkText}>GitHub</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    )}
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
    scrollContent: { paddingTop: 60, paddingHorizontal: Spacing.lg },
    loadingContainer: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
    subSectionTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textSecondary, marginBottom: Spacing.md },
    carousel: { paddingLeft: 0, paddingRight: Spacing.lg, paddingVertical: Spacing.sm },

    // List card
    listCard: {
        flexDirection: 'row',
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        overflow: 'hidden',
        marginBottom: Spacing.sm,
    },
    listImage: { width: 100, height: 100, backgroundColor: Colors.surfaceLight },
    listContent: { flex: 1, padding: Spacing.md, justifyContent: 'center' },
    listTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.text, marginBottom: 2 },
    listDesc: { fontSize: FontSizes.sm, color: Colors.textMuted, lineHeight: 18, marginBottom: 6 },
    listTags: { flexDirection: 'row', gap: 6 },
    listTag: { fontSize: FontSizes.xs, color: Colors.secondary, backgroundColor: 'rgba(0,229,255,0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },

    // Modal
    modalContainer: { flex: 1, backgroundColor: Colors.background },
    modalContent: { flex: 1 },
    modalScroll: { padding: Spacing.lg, paddingTop: 50 },
    closeBtn: { position: 'absolute', top: 12, right: 12, zIndex: 10, padding: 8 },
    modalImage: { width: '100%', height: 220, borderRadius: BorderRadius.xl, marginBottom: Spacing.md, backgroundColor: Colors.surfaceLight },
    modalFeaturedBadge: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: BorderRadius.round, marginBottom: Spacing.sm },
    modalFeaturedText: { color: Colors.text, fontSize: FontSizes.sm, fontWeight: '700' },
    modalTitle: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.sm },
    modalDescription: { fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 26, marginBottom: Spacing.xl },
    modalSectionTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
    modalTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.xl },
    modalTag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.md },
    modalTagText: { color: Colors.primaryLight, fontSize: FontSizes.sm, fontWeight: '600' },
    linksRow: { flexDirection: 'row', gap: 12 },
    linkBtn: { flex: 1 },
    linkGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: BorderRadius.md },
    linkText: { color: '#FFF', fontSize: FontSizes.md, fontWeight: '700' },
});
