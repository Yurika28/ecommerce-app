'use client'

import React, { useMemo, useState } from 'react'
import { useFilter } from '@/components/UI/FilterContext'
import InputField from '@/components/UI/InputField'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Button from '@/components/UI/Button'

export const keywords = [
  "Chanel", 
  "Dior", 
  "Dolce & Gabanna",
  "Gucci",
  "Nike", 
  "Puma",
  "Apple",
  "Rolex"
]

export default function Sidebar() {
  const {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    keyword, setKeyword,
    allProducts,
    resetFilters
  } = useFilter()

  const [openSection, setOpenSection] = useState<'keyword' | 'category' | null>(null)

  // ✅ derive categories from global data
  const categories = useMemo(() => {
    const unique = new Set(allProducts.map(p => p.category))
    return Array.from(unique)
  }, [allProducts])

  // ✅ handlers (NO FETCH)
  const handleCategory = (cat: string) => {
    setSelectedCategory(cat)
    setKeyword('')
  }

  const handleKeyword = (kw: string) => {
    setKeyword(kw)
    setSelectedCategory('')
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value ? parseFloat(value) : undefined)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value ? parseFloat(value) : undefined)
  }

  return (
    <div className='w-[320px] mt-10'>

      {/* 🔍 SEARCH */}
      <div className='my-4 px-2 py-2 shadow-md rounded-md'>
        <h2 className='text-lg font-semibold mb-2'>Search</h2>
        <InputField value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* 💰 PRICE */}
      <div className='my-4 px-2 py-2 shadow-md rounded-md'>
        <h2 className='text-lg font-semibold mb-2'>Price</h2>
        <div className='flex justify-between items-center'>
          <input
            type="number"
            className='py-2 px-2 border text-sm border-gray-300 rounded-full w-[140px]'
            placeholder='min price'
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <span className='px-2'>-</span>
          <input
            type="number"
            className='py-2 px-2 border text-sm border-gray-300 rounded-full w-[140px]'
            placeholder='max price'
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      {/* 🏷️ BRAND */}
      <div className='my-4 px-2 py-2 shadow-md rounded-md'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setOpenSection(openSection === 'keyword' ? null : 'keyword')}
        >
          <h2 className='text-lg font-semibold'>Shop by Brands</h2>
          {openSection === 'keyword'
            ? <ChevronUpIcon className='w-5 h-5' />
            : <ChevronDownIcon className='w-5 h-5' />}
        </div>

        {openSection === 'keyword' && (
          <div className='mt-2'>
            {keywords.map((kw) => (
              <label key={kw} className='block mb-2 text-sm cursor-pointer'>
                <input
                  type="radio"
                  name="keyword"
                  checked={keyword === kw}
                  onChange={() => handleKeyword(kw)}
                  className='mr-2'
                />
                {kw.toUpperCase()}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 📦 CATEGORY */}
      <div className='px-2 py-2 shadow-md rounded-md'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setOpenSection(openSection === 'category' ? null : 'category')}
        >
          <h2 className='text-lg font-semibold'>Category</h2>
          {openSection === 'category'
            ? <ChevronUpIcon className='w-5 h-5' />
            : <ChevronDownIcon className='w-5 h-5' />}
        </div>

        {openSection === 'category' && (
          <div className='mt-2'>
            {categories.map((cat) => (
              <label key={cat} className='block mb-2 text-sm cursor-pointer'>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => handleCategory(cat)}
                  className='mr-2'
                />
                {cat.toUpperCase()}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 🔄 RESET */}
      <Button
        size='large'
        variant='outline'
        onClick={resetFilters}
        className='mt-6 rounded bg-black text-white py-2 px-3'
      >
        Reset Filter
      </Button>
    </div>
  )
}