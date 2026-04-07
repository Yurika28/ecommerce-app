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