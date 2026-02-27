import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#7C4DFF',
        tabBarInactiveTintColor: '#6B6B8D',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="experience"
        options={{
          title: 'Experience',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'briefcase' : 'briefcase-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'rocket' : 'rocket-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'mail' : 'mail-outline'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, color, focused }: { name: any; color: string; focused: boolean }) {
  return (
    <View style={styles.iconContainer}>
      {focused && (
        <LinearGradient
          colors={['rgba(124, 77, 255, 0.3)', 'rgba(0, 229, 255, 0.15)']}
          style={styles.iconGlow}
        />
      )}
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0D0D22',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 20,
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 30,
  },
  iconGlow: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
