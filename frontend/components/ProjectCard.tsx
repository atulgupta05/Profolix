import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSizes, Spacing, Shadows } from '../constants/theme';
import { Project } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.78;

interface ProjectCardProps {
    item: Project;
    index: number;
    onPress: (item: Project) => void;
}

export default function ProjectCard({ item, index, onPress }: ProjectCardProps) {
    const scale = useRef(new Animated.Value(0.9)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const delay = index * 100;
        Animated.parallel([
            Animated.spring(scale, { toValue: 1, delay, useNativeDriver: true, tension: 50, friction: 7 }),
            Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }], opacity }]}>
            <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.85}>
                <LinearGradient
                    colors={['rgba(124, 77, 255, 0.15)', 'rgba(0, 229, 255, 0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    {item.featured && (
                        <LinearGradient colors={['#FF4081', '#FF6E40']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.featuredBadge}>
                            <Text style={styles.featuredText}>⭐ Featured</Text>
                        </LinearGradient>
                    )}
                    <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                        <View style={styles.tags}>
                            {item.technologies.split(',').slice(0, 3).map((tech, i) => (
                                <View key={i} style={styles.tag}><Text style={styles.tagText}>{tech.trim()}</Text></View>
                            ))}
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { width: CARD_WIDTH, marginRight: Spacing.md, ...Shadows.large },
    card: { borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Colors.glassBorder, overflow: 'hidden' },
    image: { width: '100%', height: 180, backgroundColor: Colors.surfaceLight },
    featuredBadge: { position: 'absolute', top: 12, right: 12, paddingHorizontal: 12, paddingVertical: 5, borderRadius: BorderRadius.round },
    featuredText: { color: Colors.text, fontSize: FontSizes.xs, fontWeight: '700' },
    content: { padding: Spacing.md },
    title: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.text, marginBottom: 4 },
    description: { fontSize: FontSizes.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.sm },
    tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    tag: { backgroundColor: 'rgba(0, 229, 255, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: BorderRadius.sm },
    tagText: { fontSize: FontSizes.xs, color: Colors.secondaryLight, fontWeight: '500' },
});
