import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import Colors from '@/constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { useAuth } from '@/providers/AuthProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  // if (!session) {
  //   return <Redirect href={'/'} />;
  // }

  //Might need to mount auth provider(??)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
