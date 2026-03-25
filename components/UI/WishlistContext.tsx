'use client'

import React, { createContext, useContext, useState } from 'react'
import { Product } from '../Section/ProductsGrid'

type WishlistContextType = {
  wishlistItems: Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist: (id: number) => boolean
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }

  const isInWishlist = (id: number) => wishlistItems.some(p => p.id === id)

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
