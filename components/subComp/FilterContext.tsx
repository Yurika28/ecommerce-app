'use client'

import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { Product } from '@/components/types/product'
import { useFetchProducts } from '@/components/hooks/useFetchProducts'
import { useFilteredProducts } from '@/components/hooks/useFilteredProducts'

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterState = {
  searchQuery: string
  selectedCategory: string
  minPrice: number | undefined
  maxPrice: number | undefined
  keyword: string
}

type FilterAction =
  | { type: 'SET_SEARCH';    query: string }
  | { type: 'SET_CATEGORY';  category: string }
  | { type: 'SET_MIN_PRICE'; price: number | undefined }
  | { type: 'SET_MAX_PRICE'; price: number | undefined }
  | { type: 'SET_KEYWORD';   keyword: string }
  | { type: 'RESET' }

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

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState: FilterState = {
  searchQuery: '',
  selectedCategory: '',
  minPrice: undefined,
  maxPrice: undefined,
  keyword: '',
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SEARCH':    return { ...state, searchQuery: action.query }
    case 'SET_CATEGORY':  return { ...state, selectedCategory: action.category }
    case 'SET_MIN_PRICE': return { ...state, minPrice: action.price }
    case 'SET_MAX_PRICE': return { ...state, maxPrice: action.price }
    case 'SET_KEYWORD':   return { ...state, keyword: action.keyword }
    case 'RESET':         return initialState
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FilterContext = createContext<FilterContextType | undefined>(undefined)

// ─── Provider ─────────────────────────────────────────────────────────────────

type FilterProviderProps = {
  children: React.ReactNode
  initialSearchQuery?: string
}

export const FilterProvider = ({ children, initialSearchQuery = '' }: FilterProviderProps) => {
  const [filters, dispatch] = useReducer(filterReducer, {
    ...initialState,
    searchQuery: initialSearchQuery,
  })

  const { products: allProducts } = useFetchProducts()
  const filteredProducts = useFilteredProducts(allProducts, filters)

  const setSearchQuery      = useCallback((query: string)             => dispatch({ type: 'SET_SEARCH',    query }),    [])
  const setSelectedCategory = useCallback((category: string)          => dispatch({ type: 'SET_CATEGORY',  category }), [])
  const setMinPrice         = useCallback((price: number | undefined) => dispatch({ type: 'SET_MIN_PRICE', price }),    [])
  const setMaxPrice         = useCallback((price: number | undefined) => dispatch({ type: 'SET_MAX_PRICE', price }),    [])
  const setKeyword          = useCallback((keyword: string)           => dispatch({ type: 'SET_KEYWORD',   keyword }),  [])
  const resetFilters        = useCallback(()                          => dispatch({ type: 'RESET' }),                   [])

  const hasActiveFilters = !!(
    filters.searchQuery ||
    filters.selectedCategory ||
    filters.keyword ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  )

  const value = useMemo(() => ({
    searchQuery:      filters.searchQuery,      setSearchQuery,
    selectedCategory: filters.selectedCategory, setSelectedCategory,
    minPrice:         filters.minPrice,         setMinPrice,
    maxPrice:         filters.maxPrice,         setMaxPrice,
    keyword:          filters.keyword,          setKeyword,
    filteredProducts,
    allProducts,
    hasActiveFilters,
    resetFilters,
  }), [filters, setSearchQuery, setSelectedCategory, setMinPrice, setMaxPrice, setKeyword,
      filteredProducts, allProducts, hasActiveFilters, resetFilters])

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useFilter = () => {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilter must be used inside FilterProvider')
  return ctx
}
