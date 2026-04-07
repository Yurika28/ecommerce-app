'use client'

type QuantityControlProps = {
  quantity: number
  onDecrement: () => void
  onIncrement: () => void
  min?: number
}

export default function QuantityControl({ quantity, onDecrement, onIncrement, min = 1 }: QuantityControlProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >−</button>
      <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
      >+</button>
    </div>
  )
}
