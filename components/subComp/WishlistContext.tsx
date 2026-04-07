'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import { Product } from '@/components/types/product'
import { useClerkMetaSync } from '@/components/hooks/useClerkMetaSync'
import { API } from '@/constants/api'

// ─── Types ────────────────────────────────────────────────────────────────────

type WishlistContextType = {
  wishlistItems:  Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist:   (id: number) => boolean
  wishlistCount:  number
}

// ─── Context ──────────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// ─── Provider ─────────────────────────────────────────────────────────────────

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()

  useClerkMetaSync<number[]>({
    key: 'wishlist',
    onHydrate: async (saved) => {
      if (!saved || saved.length === 0) return
      const results = await Promise.all(
        saved.map(id =>
          fetch(API.product(id))
            .then(res => res.json())
            .catch(() => null)
        )
      )
      const products = results.filter((p): p is Product => p !== null)
      setWishlistItems(products)
    },
    serialize: () => wishlistItems.map(p => p.id),
    syncDeps: [wishlistItems],
    onClear: () => setWishlistItems([]),
  })

  // ─── Actions ────────────────────────────────────────────────────────────────

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (!isSignedIn) { openSignIn(); return }
      setWishlistItems(prev =>
        prev.find(p => p.id === product.id)
          ? prev.filter(p => p.id !== product.id)
          : [...prev, product]
      )
    },
    [isSignedIn, openSignIn]
  )

  const isInWishlist = useCallback(
    (id: number) => wishlistItems.some(p => p.id === id),
    [wishlistItems]
  )

  const value = useMemo(
    () => ({ wishlistItems, toggleWishlist, isInWishlist, wishlistCount: wishlistItems.length }),
    [wishlistItems, toggleWishlist, isInWishlist]
  )

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}