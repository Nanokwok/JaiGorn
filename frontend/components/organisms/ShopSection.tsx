import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { ShopCard } from '@/components/molecules/ShopCard'
import { Shop } from '@/data/shopData'

export const ShopSection = ({
  title,
  data,
}: {
  title: string
  data: Shop[]
}) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderWrapper}>
        <SectionHeader title={title} />
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Shop) => item.id}
        renderItem={({ item }) => <ShopCard item={item} />}
        contentContainerStyle={{ paddingRight: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderWrapper: {
    paddingHorizontal: 20,
  },
})
