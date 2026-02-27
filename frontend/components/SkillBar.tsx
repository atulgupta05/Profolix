import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSizes, Spacing } from '../constants/theme';

interface SkillBarProps {
    name: string;
    proficiency: number;
    index: number;
    color?: string;
}

export default function SkillBar({ name, proficiency, index, color }: SkillBarProps) {
    const width = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const delay = index * 80;
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: false }),
            Animated.timing(width, { toValue: proficiency, duration: 800, delay: delay + 200, useNativeDriver: false }),
        ]).start();
    }, [proficiency]);

    const barWidth = width.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <View style={styles.header}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.percentage}>{proficiency}%</Text>
            </View>
            <View style={styles.track}>
                <Animated.View style={[styles.barContainer, { width: barWidth }]}>
                    <LinearGradient
                        colors={color ? [color, color + '80'] : ['#7C4DFF', '#00E5FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.bar}
                    />
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: Spacing.md },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    name: { fontSize: FontSizes.sm, color: Colors.text, fontWeight: '600' },
    percentage: { fontSize: FontSizes.sm, color: Colors.secondary, fontWeight: '700' },
    track: { height: 8, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: BorderRadius.round, overflow: 'hidden' },
    barContainer: { height: '100%', borderRadius: BorderRadius.round, overflow: 'hidden' },
    bar: { flex: 1, borderRadius: BorderRadius.round },
});
