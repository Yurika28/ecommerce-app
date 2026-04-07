'use client'

import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import { Product } from '@/components/types/product'
import { useClerkMetaSync } from '@/components/hooks/useClerkMetaSync'
import { API } from '@/constants/api'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  product: Product
  quantity: number
}

type CartMetaItem = {
  id: number
  quantity: number
}

type CartAction =
  | { type: 'ADD';      product: Product }
  | { type: 'REMOVE';   id: number }
  | { type: 'UPDATE';   id: number; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE';  items: CartItem[] }

type CartContextType = {
  cartItems:      CartItem[]
  cartCount:      number
  addToCart:      (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart:      () => void
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const exists = state.some(item => item.product.id === action.product.id)
      if (exists) {
        return state.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { product: action.product, quantity: 1 }]
    }
    case 'REMOVE':
      return state.filter(item => item.product.id !== action.id)
    case 'UPDATE':
      return state.map(item =>
        item.product.id === action.id
          ? { ...item, quantity: Math.max(1, action.quantity) }
          : item
      )
    case 'CLEAR':
      return []
    case 'HYDRATE':
      return action.items
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [])
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()

  useClerkMetaSync<CartMetaItem[]>({
    key: 'cart',
    onHydrate: async (saved) => {
      if (!saved || saved.length === 0) return
      const results = await Promise.all(
        saved.map(item =>
          fetch(API.product(item.id))
            .then(res => res.json())
            .then((product: Product) => ({ product, quantity: item.quantity }))
            .catch(() => null)
        )
      )
      const items = results.filter((item): item is CartItem => item !== null)
      dispatch({ type: 'HYDRATE', items })
    },
    serialize: () => cartItems.map(item => ({ id: item.product.id, quantity: item.quantity })),
    syncDeps: [cartItems],
    onClear: () => dispatch({ type: 'CLEAR' }),
  })

  // ─── Actions ──────────────────────────────────────────────────────────────

  const addToCart = useCallback(
    (product: Product) => {
      if (!isSignedIn) { openSignIn(); return }
      dispatch({ type: 'ADD', product })
    },
    [isSignedIn, openSignIn]
  )

  const removeFromCart  = useCallback((id: number) => dispatch({ type: 'REMOVE', id }), [])
  const updateQuantity  = useCallback((id: number, quantity: number) => dispatch({ type: 'UPDATE', id, quantity }), [])
  const clearCart       = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const value = useMemo(
    () => ({ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}