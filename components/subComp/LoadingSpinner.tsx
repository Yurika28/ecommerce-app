type LoadingSpinnerProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-12 w-12' }

export default function LoadingSpinner({ className = 'py-8', size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizeClass[size]} border-b-2 border-blue-600`} />
    </div>
  )
}