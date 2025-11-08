import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { BillCard } from '@/components/molecules/BillCard'

type Bill = {
  id: number
  title: string
  date: string
  amount: number
  status: string
}

export const BillList = ({
  bills,
  formatCurrency,
}: {
  bills: Bill[]
  formatCurrency: (amount: number) => string
}) => {
  const styles = getStyles()

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Your Bills" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.billScrollView}
      >
        {bills.map((bill) => (
          <View key={bill.id} style={{ marginRight: 8 }}>
            <BillCard bill={bill} formatCurrency={formatCurrency} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const getStyles = () =>
  StyleSheet.create({
    sectionContainer: {
      marginBottom: 20,
    },
    billScrollView: {
      paddingLeft: 2,
    },
  })
