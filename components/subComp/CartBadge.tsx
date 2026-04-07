'use client'

import Badge from './Badge'
import { useCart } from './CartContext'

export default function CartBadge({ children }: { children: React.ReactNode }) {
  const { cartCount } = useCart()
  return <Badge count={cartCount} color="blue">{children}</Badge>
}