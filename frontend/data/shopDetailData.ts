// This file links a shop to its products, filters, and categories.
// It now uses product IDs from data/productData.ts

export interface ShopDetails {
  id: string
  name: string
  filters: string[]
  highlight: string[] // List of Product IDs
  categories: {
    title: string
    products: string[] // List of Product IDs
  }[]
}

export const allShopDetails: Record<string, ShopDetails> = {
  // Paksoi Shop
  m1: {
    id: 'm1',
    name: 'Paksoi Shop',
    filters: ['Snack', 'Toy', 'Book', 'Gadget', 'Game'],
    highlight: ['p1', 'p2', 'p3', 'p4'], // These are now just IDs
    categories: [
      {
        title: 'Snack',
        products: ['p2', 'p4', 'p5'], // Just IDs
      },
      {
        title: 'Toy',
        products: ['p3'], // Just IDs
      },
    ],
  },
  // J'Lek Pad Krapoa
  f2: {
    id: 'f2',
    name: "J'Lek Pad Krapoa",
    filters: ['Food', 'Spicy', 'Drink'],
    highlight: ['p6'],
    categories: [
      {
        title: 'Main Dish',
        products: ['p6'],
      },
    ],
  },
  // Vintage Guitars
  l1: {
    id: 'l1',
    name: 'Vintage Guitars',
    filters: ['Acoustic', 'Electric', 'Accessory'],
    highlight: ['p7'],
    categories: [
      {
        title: 'Acoustic',
        products: ['p7'],
      },
    ],
  },
  // Add other shops as needed
}
