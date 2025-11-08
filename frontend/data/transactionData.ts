// This file will be our single source of truth for all transactions
export interface Transaction {
  id: string // Using string IDs is safer for routes
  title: string
  date: string // The display date for grouping
  timestamp: string // A full timestamp for the detail page
  amount: number
  status: 'Completed' | 'Pending' | 'Failed'
  category: string
  merchantName: string
  location: string
  referenceId: string
  currency: string
}

export const allTransactions: Transaction[] = [
  {
    id: 'tx-001',
    title: 'Payment to ร้านข้าวแกงสุดหล่อ',
    date: 'TODAY',
    timestamp: '2025-11-08T09:15:00Z',
    amount: -50,
    status: 'Completed',
    category: 'Food & Drink',
    merchantName: 'ร้านข้าวแกงสุดหล่อ',
    location: 'Bangkok, Thailand',
    referenceId: 'A8B-456-001',
    currency: '฿',
  },
  {
    id: 'tx-002',
    title: "Payment to J'Fai Salon",
    date: 'TODAY',
    timestamp: '2025-11-08T08:30:00Z',
    amount: -350,
    status: 'Completed',
    category: 'Services',
    merchantName: "J'Fai Salon",
    location: 'Bangkok, Thailand',
    referenceId: 'A8B-455-002',
    currency: '฿',
  },
  {
    id: 'tx-003',
    title: '7-Eleven',
    date: 'YESTERDAY',
    timestamp: '2025-11-07T18:45:00Z',
    amount: -98.5,
    status: 'Completed',
    category: 'Groceries',
    merchantName: '7-Eleven',
    location: 'Bangkok, Thailand',
    referenceId: 'A8B-454-003',
    currency: '฿',
  },
  {
    id: 'tx-004',
    title: 'BTS Skytrain',
    date: 'YESTERDAY',
    timestamp: '2025-11-07T08:05:00Z',
    amount: -44.0,
    status: 'Completed',
    category: 'Transport',
    merchantName: 'BTS Skytrain',
    location: 'Bangkok, Thailand',
    referenceId: 'A8B-453-004',
    currency: '฿',
  },
  {
    id: 'tx-005',
    title: 'Payment to ...',
    date: '5 SEPTEMBER 2025',
    timestamp: '2025-09-05T15:20:00Z',
    amount: -180,
    status: 'Completed',
    category: 'Shopping',
    merchantName: 'Unknown Merchant',
    location: 'Online',
    referenceId: 'A8B-452-005',
    currency: '฿',
  },
  {
    id: 'tx-006',
    title: 'Starbucks',
    date: '5 SEPTEMBER 2025',
    timestamp: '2025-09-05T09:00:00Z',
    amount: -120.0,
    status: 'Completed',
    category: 'Food & Drink',
    merchantName: 'Starbucks',
    location: 'Bangkok, Thailand',
    referenceId: 'A8B-451-006',
    currency: '฿',
  },
]
