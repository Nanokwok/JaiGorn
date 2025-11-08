import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { CategoryItem } from '@/components/molecules/CategoryItem'

type Category = { id: number; name: string; icon: any }

export const CategoryList = ({ categories }: { categories: Category[] }) => {
  const styles = getStyles()

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Category" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollView}
      >
        {categories.map((category) => (
          <View key={category.id}>
            <CategoryItem
              category={category}
              isActive={category.name === 'Near You'}
            />
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
    categoryScrollView: {
      paddingLeft: 2,
    },
  })
