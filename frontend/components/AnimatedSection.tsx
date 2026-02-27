import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedSectionProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    style?: ViewStyle;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export default function AnimatedSection({
    children,
    delay = 0,
    duration = 600,
    style,
    direction = 'up',
}: AnimatedSectionProps) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translate = useRef(
        new Animated.Value(
            direction === 'left' ? -30 : direction === 'right' ? 30 : direction === 'up' ? 30 : -30
        )
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(translate, {
                toValue: 0,
                duration,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const isHorizontal = direction === 'left' || direction === 'right';

    return (
        <Animated.View
            style={[
                {
                    opacity,
                    transform: isHorizontal
                        ? [{ translateX: translate }]
                        : [{ translateY: translate }],
                },
                style,
            ]}
        >
            {children}
        </Animated.View>
    );
}
