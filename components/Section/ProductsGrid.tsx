

import React from 'react';
import { useFilter } from '../UI/FilterContext';
import Card from '../UI/Card';


export type Product = {
  id: number;
  title: string;
  description: string;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  reviews: string[];
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    depth: number;
    width: number;
    height: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  meta: {
    returnPolicy: string;
    qrCode: string;
  };
};

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
