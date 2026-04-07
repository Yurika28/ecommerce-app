'use client'

import Badge from './Badge'
import { useWishlist } from './WishlistContext'

export default function WishlistBadge({ children }: { children: React.ReactNode }) {
  const { wishlistCount } = useWishlist()
  return <Badge count={wishlistCount} color="red">{children}</Badge>
}