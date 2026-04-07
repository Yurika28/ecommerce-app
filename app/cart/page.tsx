'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/subComp/PageLayout'
import { formatPrice } from '@/components/utils/currency'
import QuantityControl from '@/components/subComp/QuantityControl'
import EmptyState from '@/components/subComp/EmptyState'
import { useCart } from '@/components/subComp/CartContext'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'canceled' | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (cartItems.length > 0) {
      setSelectedIds(new Set(cartItems.map(i => i.product.id)))
    }
  }, [cartItems])

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in')
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setCheckoutStatus('success')
      const raw = sessionStorage.getItem('checkout_ids')
      if (raw) {
        const ids: number[] = JSON.parse(raw)
        ids.forEach(id => removeFromCart(id))
        sessionStorage.removeItem('checkout_ids')
      } else {
        clearCart()
      }
    }
    if (params.get('canceled') === 'true') setCheckoutStatus('canceled')
  }, [clearCart, removeFromCart])

  const selectedItems = cartItems.filter(i => selectedIds.has(i.product.id))
  const subtotal = selectedItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
  const allSelected = cartItems.length > 0 && selectedIds.size === cartItems.length

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(cartItems.map(i => i.product.id)))
  }

  const handleCheckout = async () => {
    if (selectedItems.length === 0) return
    setCheckoutLoading(true)
    sessionStorage.setItem('checkout_ids', JSON.stringify(selectedItems.map(i => i.product.id)))
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: selectedItems }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout failed:', err)
      sessionStorage.removeItem('checkout_ids')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (!isLoaded || !isSignedIn) return null

  return (
    <PageLayout>
      <main className="flex-1 container px-4 py-8 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {checkoutStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            Payment successful! Your order has been placed.
          </div>
        )}
        {checkoutStatus === 'canceled' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
            Checkout was canceled. Your cart is still saved.
          </div>
        )}

        {cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingCartIcon}
            title="Your cart is empty."
            actionLabel="Continue Shopping"
            actionHref="/"
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Cart Items ── */}
            <div className="flex-1 space-y-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-blue-600"
                />
                Select all ({cartItems.length})
              </label>

              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className={`flex items-center gap-4 p-4 border rounded-xl transition-colors ${
                    selectedIds.has(product.id) ? 'border-blue-400 bg-blue-50/30 dark:bg-blue-950/20' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    className="w-4 h-4 accent-blue-600 flex-shrink-0"
                    aria-label={`Select ${product.title}`}
                  />

                  <Link href={`/product/${product.id}`}>
                    <div className="relative w-20 h-20 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image fill src={product.thumbnail} alt={product.title} className="object-contain" />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-sm md:text-base truncate hover:underline">{product.title}</h3>
                    </Link>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{product.category}</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">${formatPrice(product.price)}</p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <QuantityControl
                      quantity={quantity}
                      onDecrement={() => updateQuantity(product.id, quantity - 1)}
                      onIncrement={() => updateQuantity(product.id, quantity + 1)}
                    />
                    <span className="text-sm font-bold">${formatPrice(product.price * quantity)}</span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.title}`}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-2">
                Clear cart
              </button>
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="border border-gray-200 rounded-xl p-6 sticky top-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Selected ({selectedItems.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span>${formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-base mb-6">
                  <span>Total</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || selectedItems.length === 0}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkoutLoading
                    ? 'Redirecting...'
                    : selectedItems.length === 0
                    ? 'Select items to checkout'
                    : `Checkout ${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''}`}
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </PageLayout>
  )
}