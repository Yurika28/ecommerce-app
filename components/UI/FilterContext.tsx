'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '../Section/ProductsGrid'

type FilterContextType = {
  searchQuery: string
  setSearchQuery: (query: string) => void

  selectedCategory: string
  setSelectedCategory: (category: string) => void

  minPrice: number | undefined
  setMinPrice: (price: number | undefined) => void

  maxPrice: number | undefined
  setMaxPrice: (price: number | undefined) => void

  keyword: string
  setKeyword: (keyword: string) => void

  filteredProducts: Product[]
  allProducts: Product[]
  hasActiveFilters: boolean

  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

type FilterProviderProps = {
  children: React.ReactNode
  initialSearchQuery?: string
}

export const FilterProvider = ({ children, initialSearchQuery = '' }: FilterProviderProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([])

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch('https://dummyjson.com/products?limit=194')
      const data = await res.json()
      setAllProducts(data.products)
    }
    fetchAll()
  }, [])

  const hasActiveFilters = !!(searchQuery || selectedCategory || keyword || minPrice !== undefined || maxPrice !== undefined)

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (keyword) {
      result = result.filter(p =>
        p.brand?.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    if (minPrice !== undefined) {
      result = result.filter(p => p.price >= minPrice)
    }

    if (maxPrice !== undefined) {
      result = result.filter(p => p.price <= maxPrice)
    }

    return result
  }, [allProducts, searchQuery, selectedCategory, keyword, minPrice, maxPrice])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setKeyword('')
  }

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
        filteredProducts,
        allProducts,
        hasActiveFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilter must be used inside FilterProvider')
  return ctx
}
