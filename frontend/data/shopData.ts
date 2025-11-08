export const shopSections = [
  {
    title: 'Food',
    data: [
      {
        id: 'f1',
        name: 'TeeNoi Thai Food',
        distance: '0.1 km',
        image: 'https://placehold.co/300x200/FFF1E0/FF8C00?text=TeeNoi+Thai',
      },
      {
        id: 'f2',
        name: "J'Lek Pad Krapoa",
        distance: '0.2 km',
        image: 'https://placehold.co/300x200/E0F8E0/32CD32?text=Pad+Krapoa',
      },
      {
        id: 'f3',
        name: 'Siam Spice',
        distance: '0.3 km',
        image: 'https://placehold.co/300x200/FFE0E0/DC143C?text=Siam+Spice',
      },
    ],
  },
  {
    title: 'Mart',
    data: [
      {
        id: 'm1',
        name: 'Paksoi Shop',
        distance: '0.1 km',
        image: 'https://placehold.co/300x200/E0E0FF/4169E1?text=Paksoi+Shop',
      },
      {
        id: 'm2',
        name: 'RumRuay Shop',
        distance: '0.2 km',
        image: 'https://placehold.co/300x200/F0E0FF/9370DB?text=RumRuay',
      },
      {
        id: 'm3',
        name: 'Took Dee',
        distance: '0.3 km',
        image: 'https://placehold.co/300x200/E0F8FF/00BFFF?text=Took+Dee',
      },
    ],
  },
  {
    title: 'Lifestyle',
    data: [
      {
        id: 'l1',
        name: 'Vintage Guitars',
        distance: '0.1 km',
        image: 'https://placehold.co/300x200/FFF8E0/B8860B?text=Guitars',
      },
      {
        id: 'l2',
        name: 'Royal Beauty Salon',
        distance: '0.2 km',
        image: 'https://placehold.co/300x200/FFE0F0/FF69B4?text=Salon',
      },
      {
        id: 'l3',
        name: 'Urban Fashion',
        distance: '0.3 km',
        image: 'https://placehold.co/300x200/F0F0F0/808080?text=Fashion',
      },
    ],
  },
]

export type Shop = (typeof shopSections)[0]['data'][0]
