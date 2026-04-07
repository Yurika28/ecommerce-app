'use client'

import React from 'react';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Product } from '@/components/types/product';
import Link from 'next/link';
import { useCart } from './CartContext';
import { formatPrice, originalPrice } from '@/components/utils/currency';

type CardProps = {
  product: Product;
};

export default function Card({ product }: CardProps) {
  const { addToCart } = useCart()

  return (
    <div className="card">
      <div className="relative w-full h-65 md:h-72 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 rounded-xl">
          <Image
            fill
            src={product.thumbnail}
            alt={product.title}
            className="object-contain cursor-pointer hover:bg-neutral-100 transition-all duration-300"
          />
        </div>

        <div className="absolute bottom-[-0.375rem] right-[-0.375rem] w-18 h-18 md:w-23 md:h-23 bg-[#ffffff] dark:bg-[#0a0a0a] rounded-tl-[50%]
          before:content-[''] before:absolute before:bottom-[0.375rem] before:left-[-1.25rem] before:w-5 before:h-5 before:rounded-br-[1.25rem] before:shadow-[0.313rem_0.313rem_0_0.313rem_#ffffff] dark:before:shadow-[0.313rem_0.313rem_0_0.313rem_#0a0a0a]
          after:content-[''] after:absolute after:top-[-1.25rem] after:right-[0.375rem] after:w-5 after:h-5 after:rounded-br-[1.25rem] after:shadow-[0.313rem_0.313rem_0_0.313rem_#ffffff] dark:after:shadow-[0.313rem_0.313rem_0_0.313rem_#0a0a0a]">
          <button
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
            className="absolute inset-2.5 bg-amber-400 rounded-full flex justify-center items-center transition-transform hover:scale-110 cursor-pointer"
          >
            <ShoppingCartIcon className="text-white p-3" />
          </button>
        </div>
      </div>

      <div className="pt-4 space-y-1">
        <div className="flex items-center text-sm text-gray-500">
          <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
          <span>{product.rating}</span>
          <span className="text-sm md:text-base ml-1 text-gray-400">({product.reviews?.length ?? 0})</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-base md:text-lg font-bold truncate hover:underline">
            {product.title.toUpperCase()}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
          <span className="text-black dark:text-white">${formatPrice(product.price)}</span>
          <span className="line-through text-gray-400">
            ${originalPrice(product.price, product.discountPercentage)}
          </span>
          <span className="text-gray-400">{product.discountPercentage}% off</span>
        </div>
      </div>
    </div>
  );
}
