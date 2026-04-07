'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/24/solid'
import PageLayout from '@/components/subComp/PageLayout'
import { formatPrice } from '@/components/utils/currency'
import EmptyState from '@/components/subComp/EmptyState'
import { useWishlist } from '@/components/subComp/WishlistContext'
import { useCart } from '@/components/subComp/CartContext'

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in')
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) return null

  return (
    <PageLayout>
      <main className="flex-1 container px-4 py-8 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={HeartIcon}
            title="Your wishlist is empty."
            actionLabel="Discover Products"
            actionHref="/"
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistItems.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                <Link href={`/product/${product.id}`}>
                  <div className="relative bg-neutral-100 h-52 flex items-center justify-center p-4">
                    <Image
                      fill
                      src={product.thumbnail}
                      alt={product.title}
                      className="object-contain hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-1 gap-2">
                  <div className="flex items-center text-xs text-gray-400 gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-sm truncate hover:underline">{product.title}</h3>
                  </Link>
                  <p className="text-base font-bold">${formatPrice(product.price)}</p>

                  <div className="flex gap-2 mt-auto pt-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label="Remove from wishlist"
                      className="p-2 border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </PageLayout>
  )
}