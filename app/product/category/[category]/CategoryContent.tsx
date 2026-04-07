'use client';

import Card from '@/components/subComp/Card';
import LoadingSpinner from '@/components/subComp/LoadingSpinner';
import { useFilter } from '@/components/subComp/FilterContext';
import { Product } from '@/components/types/product';

type CategoryContentProps = {
  category: string;
  selectedSubCategory: string;
  products: Product[];
  loading: boolean;
};

const CategoryContent = ({
  category,
  selectedSubCategory,
  products,
  loading,
}: CategoryContentProps) => {
  const { filteredProducts, hasActiveFilters } = useFilter();

  // Only use FilterContext results when the user has actively set a filter,
  // otherwise show the category-specific products fetched from the API.
  const displayProducts = hasActiveFilters ? filteredProducts : products;

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold my-8 uppercase pl-2">
        {category} {selectedSubCategory && `- ${selectedSubCategory.split('-').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')}`}
      </h1>

      {loading ? (
        <LoadingSpinner className="h-64" size="lg" />
      ) :displayProducts.length === 0 ? (
        <p className="text-gray-500 col-span-4">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryContent;
