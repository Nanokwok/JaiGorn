import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { Image } from 'expo-image'
import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { Link } from 'expo-router'

export const HomeHeader = ({
  name,
  profileImageUrl,
}: {
  name: string
  profileImageUrl: string
}) => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  return (
    <View style={styles.headerContainer}>
      <View>
        <ThemedText style={styles.headerHello}>Hello,</ThemedText>
        <ThemedText style={styles.headerName}>{name}</ThemedText>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={26}
            color={themeColors.icon}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    headerHello: {
      fontSize: 16,
      color: themeColors.icon,
    },
    headerName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bellIcon: {
      marginRight: 15,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  })
