import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius } from '../constants/theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    gradient?: boolean;
    gradientColors?: [string, string, ...string[]];
}

export default function GlassCard({ children, style, gradient = false, gradientColors }: GlassCardProps) {
    if (gradient) {
        return (
            <LinearGradient
                colors={gradientColors ?? ['rgba(124, 77, 255, 0.15)', 'rgba(0, 229, 255, 0.08)'] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, style]}
            >
                {children}
            </LinearGradient>
        );
    }

    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.glass,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
        padding: 20,
        marginVertical: 8,
    },
});
