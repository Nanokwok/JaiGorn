export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export const allProducts: Record<string, Product> = {
  // Paksoi Shop Products
  p1: {
    id: 'p1',
    name: 'Yadom',
    price: 29,
    image: 'https://placehold.co/300x300/E0F8E0/32CD32?text=Yadom',
    description:
      'Refreshing Thai inhaler, perfect for clearing your senses. A blend of eucalyptus, peppermint, and menthol.',
  },
  p2: {
    id: 'p2',
    name: 'Lay Malah Flavor',
    price: 20,
    image: 'https://placehold.co/300x300/FFE0E0/DC143C?text=Lays',
    description:
      "Limited edition Lay's potato chips with a spicy and numbing Malah hotpot flavor. A must-try for snack lovers.",
  },
  p3: {
    id: 'p3',
    name: 'Toy',
    price: 35,
    image: 'https://placehold.co/300x300/E0E0FF/4169E1?text=Toy',
    description:
      'Colorful stacking cup toys for toddlers. Helps develop motor skills and color recognition. Fun and safe.',
  },
  p4: {
    id: 'p4',
    name: 'Corn Snack',
    price: 10,
    image: 'https://placehold.co/300x300/FFF8E0/B8860B?text=Corn+Snack',
    description:
      'Classic crispy corn snack. A savory and crunchy treat that has been loved for generations. Great for a quick bite.',
  },
  p5: {
    id: 'p5',
    name: 'Biscuit Snack Chicken Flavor',
    price: 10,
    image: 'https://placehold.co/300x300/FFF1E0/FF8C00?text=Biscuit',
    description:
      'Small, savory biscuit crackers with a delicious chicken flavor. Highly addictive and perfect for sharing.',
  },
  p6: {
    id: 'p6',
    name: 'Pad Krapoa',
    price: 50,
    image: 'https://placehold.co/300x200/E0F8E0/32CD32?text=Pad+Krapoa',
    description: 'Spicy Thai holy basil stir-fry. A classic dish.',
  },
  p7: {
    id: 'p7',
    name: 'Acoustic Guitar',
    price: 2500,
    image: 'https://placehold.co/300x200/FFF8E0/B8860B?text=Guitars',
    description: 'Beginner acoustic guitar with a warm tone.',
  },
}
