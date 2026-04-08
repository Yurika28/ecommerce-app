'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/subComp/Card';
import PageLayout from '@/components/subComp/PageLayout';
import Breadcrumb from '@/components/subComp/Breadcrumb';
import Sidebar from '@/components/subComp/Sidebar';
import { FilterProvider, useFilter } from '@/components/subComp/FilterContext';

function SearchResults({ query }: { query: string }) {
  const { filteredProducts, allProducts, setSearchQuery } = useFilter()
  const loading = allProducts.length === 0

  useEffect(() => {
    setSearchQuery(query)
  }, [query, setSearchQuery])

  return (
    <div>
      <h2 className="text-2xl font-bold py-6">
        Search Results for: <span className="text-blue-600">{query.toUpperCase()}</span>
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <p className="col-span-4">Loading...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-4">No products found.</p>
        )}
      </div>
    </div>
  )
}

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <FilterProvider initialSearchQuery={query}>
      <PageLayout>
        <main className="p-4 mb-6">
          <Breadcrumb />
          <div className='w-full flex gap-2 md:gap-6'>
            <Sidebar />
            <SearchResults query={query} />
          </div>
        </main>
      </PageLayout>
    </FilterProvider>
  );
}

export default function SearchResult() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
