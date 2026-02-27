import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Linking, ActivityIndicator, StatusBar, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { resumeApi, Profile } from '../../services/api';
import AnimatedSection from '../../components/AnimatedSection';
import GlassCard from '../../components/GlassCard';
import SectionHeader from '../../components/SectionHeader';

interface ContactAction {
    id: string;
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    colors: string[];
    onPress: () => void;
}

export default function ContactScreen() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await resumeApi.getProfile();
            setProfile(res.data);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = (url: string, fallbackMsg: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', fallbackMsg);
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!profile) return null;

    const contactActions: ContactAction[] = [
        {
            id: 'email',
            title: 'Send Email',
            subtitle: profile.email,
            icon: 'mail',
            colors: ['#7C4DFF', '#B388FF'],
            onPress: () => handleAction(`mailto:${profile.email}`, 'Could not open email client'),
        },
        {
            id: 'phone',
            title: 'Call Me',
            subtitle: profile.phone,
            icon: 'call',
            colors: ['#00E676', '#69F0AE'],
            onPress: () => handleAction(`tel:${profile.phone}`, 'Could not open dialer'),
        },
        {
            id: 'linkedin',
            title: 'LinkedIn Profile',
            subtitle: 'Connect with me',
            icon: 'logo-linkedin',
            colors: ['#0077B5', '#00A0DC'],
            onPress: () => handleAction(profile.linkedIn, 'Could not open LinkedIn'),
        },
        {
            id: 'github',
            title: 'GitHub Profile',
            subtitle: 'Check my code',
            icon: 'logo-github',
            colors: ['#333', '#666'],
            onPress: () => handleAction(profile.github, 'Could not open GitHub'),
        },
        {
            id: 'portfolio',
            title: 'Portfolio Website',
            subtitle: profile.portfolio,
            icon: 'globe',
            colors: ['#FF4081', '#FF6E40'],
            onPress: () => handleAction(profile.portfolio, 'Could not open portfolio'),
        },
        {
            id: 'location',
            title: 'Location',
            subtitle: profile.location,
            icon: 'location',
            colors: ['#00E5FF', '#00B0FF'],
            onPress: () => handleAction(
                `https://maps.google.com/?q=${encodeURIComponent(profile.location)}`,
                'Could not open maps'
            ),
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <AnimatedSection delay={100}>
                    <SectionHeader
                        title="📞 Get In Touch"
                        subtitle="Let's connect! Tap any option below to reach me directly"
                    />
                </AnimatedSection>

                {/* Contact Header Card */}
                <AnimatedSection delay={200}>
                    <GlassCard gradient>
                        <View style={styles.contactHeader}>
                            <Text style={styles.contactHeaderTitle}>I'm always open to</Text>
                            <Text style={styles.contactHeaderHighlight}>new opportunities 🚀</Text>
                            <Text style={styles.contactHeaderDesc}>
                                Whether it's a full-time role, freelance project, or just a chat about technology — feel free to reach out!
                            </Text>
                        </View>
                    </GlassCard>
                </AnimatedSection>

                {/* Contact Actions */}
                {contactActions.map((action, index) => (
                    <AnimatedSection key={action.id} delay={300 + index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={action.onPress}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.actionGradient}
                            >
                                <LinearGradient
                                    colors={action.colors}
                                    style={styles.actionIcon}
                                >
                                    <Ionicons name={action.icon} size={24} color="#FFF" />
                                </LinearGradient>
                                <View style={styles.actionTextContainer}>
                                    <Text style={styles.actionTitle}>{action.title}</Text>
                                    <Text style={styles.actionSubtitle} numberOfLines={1}>{action.subtitle}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </AnimatedSection>
                ))}

                {/* Footer */}
                <AnimatedSection delay={1000}>
                    <View style={styles.footer}>
                        <LinearGradient
                            colors={['#7C4DFF', '#00E5FF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.footerLine}
                        />
                        <Text style={styles.footerText}>Built with ❤️ using React Native & Spring Boot by Atul Gupta</Text>
                        <Text style={styles.footerVersion}>ProfoliX v1.0</Text>
                    </View>
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

    // Header card
    contactHeader: { alignItems: 'center', paddingVertical: Spacing.md },
    contactHeaderTitle: { fontSize: FontSizes.lg, color: Colors.textSecondary, marginBottom: 4 },
    contactHeaderHighlight: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.sm },
    contactHeaderDesc: { fontSize: FontSizes.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, paddingHorizontal: Spacing.md },

    // Action cards
    actionCard: {
        marginBottom: Spacing.sm,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        ...Shadows.small,
    },
    actionGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    actionTextContainer: { flex: 1 },
    actionTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.text, marginBottom: 2 },
    actionSubtitle: { fontSize: FontSizes.sm, color: Colors.textMuted },

    // Footer
    footer: { alignItems: 'center', marginTop: Spacing.xl, paddingTop: Spacing.lg },
    footerLine: { width: 60, height: 3, borderRadius: 2, marginBottom: Spacing.md },
    footerText: { fontSize: FontSizes.sm, color: Colors.textMuted, marginBottom: 4 },
    footerVersion: { fontSize: FontSizes.xs, color: Colors.textMuted },
});
