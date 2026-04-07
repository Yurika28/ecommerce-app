

import React from 'react';
import { useFilter } from '../subComp/FilterContext';
import Card from '../subComp/Card';
;


export default function ProductsGrid() {
  const { filteredProducts } = useFilter()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredProducts.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  )
}
