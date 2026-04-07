export const formatPrice = (price: number): string => price.toFixed(2)

export const originalPrice = (price: number, discountPercentage: number): string =>
  (price / (1 - discountPercentage / 100)).toFixed(2)
