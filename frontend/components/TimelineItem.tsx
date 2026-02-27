import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSizes, Spacing, Shadows } from '../constants/theme';
import { Experience } from '../services/api';

interface TimelineItemProps {
    item: Experience;
    index: number;
    onPress: (item: Experience) => void;
    isLast?: boolean;
}

export default function TimelineItem({ item, index, onPress, isLast = false }: TimelineItemProps) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-40)).current;

    useEffect(() => {
        const delay = index * 150;
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
            Animated.timing(translateX, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity, transform: [{ translateX }] }]}>
            {/* Timeline Line & Dot */}
            <View style={styles.timelineTrack}>
                <LinearGradient
                    colors={item.current ? ['#7C4DFF', '#00E5FF'] : ['#7C4DFF', '#FF4081']}
                    style={styles.dot}
                />
                {!isLast && <View style={styles.line} />}
            </View>

            {/* Content Card */}
            <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(item)} activeOpacity={0.8}>
                <LinearGradient
                    colors={['rgba(124, 77, 255, 0.12)', 'rgba(0, 229, 255, 0.06)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text style={styles.role}>{item.role}</Text>
                            <Text style={styles.company}>{item.company}</Text>
                        </View>
                        {item.current && (
                            <LinearGradient colors={['#7C4DFF', '#00E5FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.currentBadge}>
                                <Text style={styles.currentText}>Current</Text>
                            </LinearGradient>
                        )}
                    </View>

                    <View style={styles.meta}>
                        <Text style={styles.metaText}>📅 {item.startDate} — {item.endDate}</Text>
                        <Text style={styles.metaText}>📍 {item.location}</Text>
                    </View>

                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

                    <View style={styles.tags}>
                        {item.technologies.split(',').slice(0, 4).map((tech, i) => (
                            <View key={i} style={styles.tag}><Text style={styles.tagText}>{tech.trim()}</Text></View>
                        ))}
                        {item.technologies.split(',').length > 4 && (
                            <View style={[styles.tag, styles.tagMore]}><Text style={styles.tagText}>+{item.technologies.split(',').length - 4}</Text></View>
                        )}
                    </View>
                    <Text style={styles.tapHint}>Tap for details →</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', marginBottom: 0 },
    timelineTrack: { width: 32, alignItems: 'center' },
    dot: { width: 14, height: 14, borderRadius: 7, marginTop: 6, ...Shadows.glow },
    line: { width: 2, flex: 1, backgroundColor: 'rgba(124, 77, 255, 0.3)', marginTop: 4 },
    cardContainer: { flex: 1, marginLeft: Spacing.sm, marginBottom: Spacing.md },
    card: { borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.glassBorder, padding: Spacing.md },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
    headerText: { flex: 1 },
    role: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.text, marginBottom: 2 },
    company: { fontSize: FontSizes.md, color: Colors.primaryLight, fontWeight: '600' },
    currentBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.round, marginLeft: 8 },
    currentText: { fontSize: FontSizes.xs, color: Colors.text, fontWeight: '700' },
    meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: Spacing.sm },
    metaText: { fontSize: FontSizes.sm, color: Colors.textSecondary },
    description: { fontSize: FontSizes.sm, color: Colors.textMuted, lineHeight: 20, marginBottom: Spacing.sm },
    tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.sm },
    tag: { backgroundColor: 'rgba(124, 77, 255, 0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: BorderRadius.sm },
    tagMore: { backgroundColor: 'rgba(0, 229, 255, 0.2)' },
    tagText: { fontSize: FontSizes.xs, color: Colors.primaryLight, fontWeight: '500' },
    tapHint: { fontSize: FontSizes.xs, color: Colors.textMuted, textAlign: 'right' },
});
