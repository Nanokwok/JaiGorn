import React from 'react'
import { View, StyleSheet, useColorScheme } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { SeeAllButton } from '@/components/atoms/SeeAllButton'
import { Colors } from '@/constants/theme'

export const SectionHeader = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  return (
    <View style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <SeeAllButton />
    </View>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
    },
  })
