import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    style?: ViewStyle;
}

export default function SectionHeader({ title, subtitle, style }: SectionHeaderProps) {
    return (
        <>
            <Text style={[styles.title, style]}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: FontSizes.xxl,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: FontSizes.md,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
        lineHeight: 22,
    },
});
