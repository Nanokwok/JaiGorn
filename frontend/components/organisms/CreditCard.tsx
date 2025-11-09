import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'

export const CreditCard = ({
  available,
  total,
  currency,
}: {
  available: number
  total: number
  currency: string
}) => {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getStyles(themeColors)

  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

  return (
    <View style={styles.cardContainer}>
      <ThemedText style={styles.cardAvailableText}>Available credit</ThemedText>
      <View style={styles.cardAmountRow}>
        <ThemedText style={styles.cardAmount}>
          {isBalanceVisible
            ? `${currency} ${available.toLocaleString()}`
            : `${currency} ****`}
        </ThemedText>
        <TouchableOpacity
          style={styles.cardEyeIcon}
          onPress={() => setIsBalanceVisible(!isBalanceVisible)}
        >
          <Ionicons
            name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={themeColors.tintForeground}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <ThemedText style={styles.cardAllCreditText}>
          All credit {currency}
          {total.toLocaleString()} &gt;
        </ThemedText>
      </TouchableOpacity>
    </View>
  )
}

const getStyles = (themeColors: (typeof Colors)['light']) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: themeColors.tint,
      borderRadius: 20,
      padding: 20,
      marginTop: 15,
      marginBottom: 25,
    },
    cardAvailableText: {
      color: themeColors.tintForeground,
      fontSize: 14,
      opacity: 0.9,
    },
    cardAmountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginVertical: 5,
    },
    cardAmount: {
      lineHeight: 40,
      color: themeColors.tintForeground,
      fontSize: 28,
      fontWeight: '800',
    },
    cardEyeIcon: {
      padding: 5,
    },
    cardAllCreditText: {
      color: themeColors.tintForeground,
      fontSize: 12,
      opacity: 0.9,
      marginTop: 5,
    },
  })
