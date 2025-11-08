import {
  StyleSheet,
  View,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { userData } from '@/data/homeData'

const getDynamicStyles = (themeColors: (typeof Colors)['light']) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    container: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      backgroundColor: themeColors.componentBackground,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 10,
      // Shadow
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    menuItemText: {
      fontSize: 16,
      color: themeColors.text,
      marginLeft: 15,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutText: {
      color: '#FF453A',
    },
  })
}

const MenuItem = ({
  label,
  icon,
  onPress,
  styles,
  themeColors,
  isLogout = false,
}: {
  label: string
  icon: any
  onPress: () => void
  styles: any
  themeColors: (typeof Colors)['light']
  isLogout?: boolean
}) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      <Ionicons
        name={icon}
        size={22}
        color={isLogout ? '#FF453A' : themeColors.tint}
      />
      <ThemedText style={[styles.menuItemText, isLogout && styles.logoutText]}>
        {label}
      </ThemedText>
    </View>
    {!isLogout && (
      <Ionicons
        name="chevron-forward"
        size={20}
        color={themeColors.secondaryText}
      />
    )}
  </TouchableOpacity>
)

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getDynamicStyles(themeColors)
  const router = useRouter()

  // Mock functions for button presses
  const handleEditProfile = () => {
    console.log('Navigate to Edit Profile')
    // router.push('/profile/edit'); // You would navigate here
  }

  const handleSettings = () => {
    console.log('Navigate to Settings')
    // router.push('/settings'); // You would navigate here
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // Add your logout logic here
    // router.replace('/login'); // Example of navigating away
  }

  return (
    <SafeAreaView style={styles.safeAreaWrapper} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Profile', headerBackTitle: 'Home' }} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: userData.profileImageUrl }}
              style={styles.profileImage}
            />
            <ThemedText style={styles.profileName}>{userData.name}</ThemedText>
          </View>

          <MenuItem
            label="Edit Profile"
            icon="person-outline"
            onPress={handleEditProfile}
            styles={styles}
            themeColors={themeColors}
          />
          <MenuItem
            label="Settings"
            icon="settings-outline"
            onPress={handleSettings}
            styles={styles}
            themeColors={themeColors}
          />

          <View style={{ marginTop: 20 }}>
            <MenuItem
              label="Log Out"
              icon="log-out-outline"
              onPress={handleLogout}
              styles={styles}
              themeColors={themeColors}
              isLogout={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
