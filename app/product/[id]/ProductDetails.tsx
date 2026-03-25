'use client'

import React, { useState } from 'react'
import { StarIcon, HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Button from '@/components/UI/Button'
import { Product } from '@/components/Section/ProductsGrid'
import { useCart } from '@/components/UI/CartContext'
import { useWishlist } from '@/components/UI/WishlistContext'

export default function ProductDetails({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  return (
    <div className="overflow-y-hidden">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen">

          <div className="flex flex-col min-h-0 overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={product.title}
                  className="w-full h-auto object-contain bg-[#dedede] rounded-md"
                />
              ))}
            </div>
          </div>

          <div className='flex flex-col min-h-0'>
            <div className="space-y-2">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.title.toUpperCase()}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
                  <span>{product.rating}</span>
                  <span className="ml-1 text-gray-400">({product.reviews?.length ?? 0} reviews)</span>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">${product.price}</h3>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-500">
                  Stocks: {product.stock > 0 ? product.stock : <span className="text-red-500">Out of stock</span>}
                </p>
              </div>

              <div className="flex items-center gap-2 justify-center">
                <Button
                  className='w-full'
                  variant="primary"
                  size="large"
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
                >
                  {wishlisted
                    ? <HeartSolid className="w-5 h-5 text-red-500" />
                    : <HeartIcon className="w-5 h-5 text-gray-500" />}
                </button>
              </div>

              <div className="w-full my-4 p-4 shadow-md rounded-md bg-white transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Product Information</h2>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 focus:outline-none cursor-pointer"
                  >
                    {isOpen ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[1000px]' : 'max-h-0'
                  }`}
                >
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-1">Dimensions</h3>
                          <p className="text-sm text-gray-600">
                            Width: {product.dimensions.width}cm × Height: {product.dimensions.height}cm × Depth: {product.dimensions.depth}cm
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Weight</h3>
                          <p className="text-sm text-gray-600">{product.weight}kg</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">SKU</h3>
                          <p className="text-sm text-gray-600">{product.sku}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-1">Warranty Information</h3>
                          <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Shipping Information</h3>
                          <p className="text-sm text-gray-600">{product.shippingInformation}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Return Policy</h3>
                          <p className="text-sm text-gray-600">{product.meta.returnPolicy}</p>
                        </div>
                      </div>
                    </div>

                    {product.tags.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
