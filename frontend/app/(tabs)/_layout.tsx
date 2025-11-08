import { Tabs } from 'expo-router'
import React from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: 'Transaction',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="arrow.left.arrow.right" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearYou"
        options={{
          title: 'Near You',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="storefront" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bill"
        options={{
          title: 'Bill',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="doc.text" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
