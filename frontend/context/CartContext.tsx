import { allProducts, Product } from '@/data/productData' // Import your Product type
import React, { createContext, useState, useContext, ReactNode } from 'react'

// Define what a cart item looks like
export interface CartItem {
  product: Product
  quantity: number
}

// Define the shape of the context
interface CartContextType {
  cartItems: Map<string, CartItem> // Use a Map for easy lookups by product ID
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void // 1. Add removeFromCart
  clearCart: () => void // 2. Add clearCart
  getCartCount: () => number
  getCartTotal: () => number
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Create the Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState(new Map<string, CartItem>())

  // --- Add to Cart ---
  const addToCart = (productId: string) => {
    const product = allProducts[productId] // Get product from your 'database'
    if (!product) return

    setCartItems((prevItems) => {
      const newItems = new Map(prevItems)
      const existingItem = newItems.get(productId)

      if (existingItem) {
        // If item exists, increment quantity
        newItems.set(productId, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        })
      } else {
        // If item doesn't exist, add it with quantity 1
        newItems.set(productId, { product, quantity: 1 })
      }

      console.log('Cart updated:', newItems)
      return newItems
    })
  }

  // --- 3. Implement removeFromCart ---
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems)
      const existingItem = newItems.get(productId)

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If quantity > 1, decrement quantity
          newItems.set(productId, {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          })
        } else {
          // If quantity is 1, remove the item
          newItems.delete(productId)
        }
      }

      console.log('Cart updated:', newItems)
      return newItems
    })
  }

  // --- 4. Implement clearCart ---
  const clearCart = () => {
    setCartItems(new Map<string, CartItem>())
    console.log('Cart cleared')
  }

  // --- Get Total Item Count (for the badge) ---
  const getCartCount = () => {
    let count = 0
    for (const item of cartItems.values()) {
      count += item.quantity
    }
    return count
  }

  // --- Get Cart Total Price ---
  const getCartTotal = () => {
    let total = 0
    for (const item of cartItems.values()) {
      total += item.product.price * item.quantity
    }
    return total
  }

  // --- 5. Add functions to the value ---
  const value = {
    cartItems,
    addToCart,
    removeFromCart, // Added
    clearCart, // Added
    getCartCount,
    getCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Create a custom hook to use the cart
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
