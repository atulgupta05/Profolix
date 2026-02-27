import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSizes, Shadows, Spacing } from '../constants/theme';

interface StatCardProps {
    label: string;
    value: number;
    icon: string;
    delay?: number;
    gradientColors?: string[];
}

export default function StatCard({ label, value, icon, delay = 0, gradientColors }: StatCardProps) {
    const scale = useRef(new Animated.Value(0.8)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                delay,
                useNativeDriver: true,
                tension: 50,
                friction: 7,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [value]);

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }], opacity }]}>
            <LinearGradient
                colors={(gradientColors || ['rgba(124, 77, 255, 0.2)', 'rgba(0, 229, 255, 0.1)']) as [string, string, ...string[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <Text style={styles.icon}>{icon}</Text>
                <Text style={styles.value}>{value}+</Text>
                <Text style={styles.label}>{label}</Text>
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 4,
        ...Shadows.medium,
    },
    gradient: {
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        padding: Spacing.md,
        alignItems: 'center',
        minHeight: 110,
        justifyContent: 'center',
    },
    icon: { fontSize: 24, marginBottom: 4 },
    value: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.text },
    label: { fontSize: FontSizes.xs, color: Colors.textSecondary, marginTop: 2, textAlign: 'center' },
});
