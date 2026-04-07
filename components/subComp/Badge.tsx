'use client'

type BadgeProps = {
  count: number
  color: 'blue' | 'red'
  children: React.ReactNode
}

const colorClass = { blue: 'bg-blue-600', red: 'bg-red-500' }

export default function Badge({ count, color, children }: BadgeProps) {
  return (
    <div className="relative">
      {children}
      {count > 0 && (
        <span className={`absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] ${colorClass[color]} text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center px-0.5`}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}