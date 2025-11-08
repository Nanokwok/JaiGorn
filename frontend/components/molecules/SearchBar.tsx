import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'

export const SearchBar = ({
  onSearch,
}: {
  onSearch: (query: string) => void
}) => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
    onSearch('')
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color={themeColors.secondaryText} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your shop..."
          placeholderTextColor={themeColors.secondaryText}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons
              name="close-circle"
              size={20}
              color={themeColors.secondaryText}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.componentBackground,
      borderRadius: 10,
      paddingHorizontal: 10,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: themeColors.text,
      marginLeft: 5,
    },
  })
