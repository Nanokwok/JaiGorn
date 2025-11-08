import React from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'

type Category = { name: string; icon: any }

export const CategoryItem = ({
  category,
  isActive,
}: {
  category: Category
  isActive: boolean
}) => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  return (
    <TouchableOpacity style={styles.categoryItem}>
      <View
        style={[
          styles.categoryIconContainer,
          isActive && styles.categoryIconContainerActive,
        ]}
      >
        <Ionicons
          name={category.icon}
          size={24}
          color={isActive ? themeColors.tintForeground : themeColors.tint}
        />
      </View>
      <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
    </TouchableOpacity>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    categoryItem: {
      alignItems: 'center',
      marginRight: 20,
      width: 60,
    },
    categoryIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: themeColors.componentBackground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    categoryIconContainerActive: {
      backgroundColor: themeColors.tint,
    },
    categoryText: {
      fontSize: 12,
      color: themeColors.icon,
      textAlign: 'center',
    },
  })
