import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  useColorScheme,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { allTransactions, Transaction } from '@/data/transactionData'

const formatCurrency = (amount: number) => {
  const currency = allTransactions[0]?.currency || '฿'
  return `${currency} ${Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

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
    header: {
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'android' ? 25 : 10,
      paddingBottom: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    sectionHeader: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: themeColors.background,
    },
    sectionHeaderText: {
      fontSize: 12,
      color: themeColors.icon,
      textTransform: 'uppercase',
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderColor,
      backgroundColor: themeColors.componentBackground,
    },
    transactionLeft: {
      flex: 1,
      marginRight: 10,
    },
    transactionTitle: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: '500',
      marginBottom: 2,
    },
    transactionDate: {
      fontSize: 12,
      color: themeColors.secondaryText,
    },
    transactionRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    transactionAmount: {
      fontSize: 14,
      color: themeColors.text,
      fontWeight: 'bold',
    },
  })
}

const TransactionItem = ({
  item,
  styles,
}: {
  item: Transaction
  styles: ReturnType<typeof getDynamicStyles>
}) => (
  <Link href={`/transaction/${item.id}`} asChild>
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <ThemedText style={styles.transactionTitle} numberOfLines={1}>
          {item.title}
        </ThemedText>
      </View>
      <View style={styles.transactionRight}>
        <ThemedText style={styles.transactionAmount}>
          {formatCurrency(item.amount)}
        </ThemedText>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={Colors.light.secondaryText}
        />
      </View>
    </TouchableOpacity>
  </Link>
)

export default function TransactionScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const themeColors = Colors[colorScheme]
  const styles = getDynamicStyles(themeColors)

  const groupedTransactions = allTransactions.reduce((acc, tx) => {
    ;(acc[tx.date] = acc[tx.date] || []).push(tx)
    return acc
  }, {} as Record<string, Transaction[]>)

  const sections = Object.keys(groupedTransactions).map((date) => ({
    title: date,
    data: groupedTransactions[date],
  }))

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <ThemedView style={styles.safeArea}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <ThemedText style={styles.title}>Transactions</ThemedText>
            </View>
          }
          renderItem={({ item }) => (
            <TransactionItem item={item} styles={styles} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionHeaderText}>{title}</ThemedText>
            </View>
          )}
          stickySectionHeadersEnabled={true}
        />
      </ThemedView>
    </SafeAreaView>
  )
}
