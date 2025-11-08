import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { Image } from 'expo-image'
import { Colors } from '@/constants/theme'
import { Shop } from '@/data/shopData'
import { Link } from 'expo-router'

export const ShopCard = ({ item }: { item: Shop }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  return (
    <Link href={`/shop/${item.id}`} asChild>
      <TouchableOpacity style={styles.shopCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.shopImage}
          contentFit="cover"
        />
        <View style={styles.shopInfo}>
          <ThemedText style={styles.shopName} numberOfLines={1}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.shopDistance}>{item.distance}</ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    shopCard: {
      width: 160,
      marginLeft: 20,
      backgroundColor: themeColors.componentBackground,
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    shopImage: {
      width: '100%',
      height: 100,
    },
    shopInfo: {
      padding: 10,
    },
    shopName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 3,
    },
    shopDistance: {
      fontSize: 12,
      color: themeColors.secondaryText,
    },
  })
