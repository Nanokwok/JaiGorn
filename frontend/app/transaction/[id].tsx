import {
  StyleSheet,
  View,
  useColorScheme,
  ScrollView,
} from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import React from 'react'
import { Stack, useLocalSearchParams, Redirect } from 'expo-router'
import { allTransactions } from '@/data/transactionData'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

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
    header: {
      alignItems: 'center',
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderColor,
    },
    amount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 5,
    },
    status: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.tint,
      textTransform: 'capitalize',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderColor,
    },
    detailLabel: {
      fontSize: 16,
      color: themeColors.secondaryText,
    },
    detailValue: {
      fontSize: 16,
      color: themeColors.text,
      fontWeight: '500',
      maxWidth: '60%',
      textAlign: 'right',
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
    },
  })
}

const DetailRow = ({
  label,
  value,
  styles,
}: {
  label: string
  value: string
  styles: any
}) => (
  <View style={styles.detailRow}>
    <ThemedText style={styles.detailLabel}>{label}</ThemedText>
    <ThemedText style={styles.detailValue} numberOfLines={2}>
      {value}
    </ThemedText>
  </View>
)

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getDynamicStyles(themeColors)

  const transaction = allTransactions.find((tx) => tx.id === id)

  if (!transaction) {
    return <Redirect href="/(tabs)/transaction" />
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      ' at ' +
      date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )
  }

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <SafeAreaView style={styles.safeAreaWrapper} edges={['bottom']}>
      <Stack.Screen
        options={{ title: 'Transaction Details', headerBackTitle: 'Back' }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconRow}>
              <Ionicons name="fast-food" size={20} color={themeColors.text} />
              <ThemedText style={[styles.detailValue, { maxWidth: '100%' }]}>
                {transaction.merchantName}
              </ThemedText>
            </View>
            <ThemedText style={styles.amount}>
              {formatCurrency(transaction.amount, transaction.currency)}
            </ThemedText>
            <ThemedText style={styles.status}>{transaction.status}</ThemedText>
          </View>

          <DetailRow
            label="Date & Time"
            value={formatTimestamp(transaction.timestamp)}
            styles={styles}
          />
          <DetailRow
            label="Category"
            value={transaction.category}
            styles={styles}
          />
          <DetailRow
            label="Location"
            value={transaction.location}
            styles={styles}
          />
          <DetailRow
            label="Reference ID"
            value={transaction.referenceId}
            styles={styles}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
