import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  useColorScheme,
} from 'react-native'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import React from 'react'
import { Stack } from 'expo-router'
import { shopSections } from '@/data/shopData'
import { SearchBar } from '@/components/molecules/SearchBar'
import { ShopSection } from '@/components/organisms/ShopSection'

const getDynamicStyles = (themeColors: (typeof Colors)['light']) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
  })
}

export default function NearYouScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getDynamicStyles(themeColors)

  const handleSearch = (query: string) => {
    console.log('Search Query:', query)
  }

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <Stack.Screen options={{ title: 'Near You' }} />

      <ThemedView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <SearchBar onSearch={handleSearch} />
          {shopSections.map((section) => (
            <ShopSection
              key={section.title}
              title={section.title}
              data={section.data}
            />
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  )
}
