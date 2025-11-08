import React from 'react'
import { TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'

export const SeeAllButton = () => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  return (
    <TouchableOpacity>
      <ThemedText style={styles.seeAllText}>See All &gt;</ThemedText>
    </TouchableOpacity>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    seeAllText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.tint,
    },
  })
