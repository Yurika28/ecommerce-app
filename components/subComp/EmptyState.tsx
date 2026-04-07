import Link from 'next/link'
import { ComponentType } from 'react'

type EmptyStateProps = {
  icon: ComponentType<{ className?: string }>
  title: string
  actionLabel: string
  actionHref: string
}

export default function EmptyState({ icon: Icon, title, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <Icon className="w-16 h-16 text-gray-300" />
      <p className="text-xl text-gray-500">{title}</p>
      <Link
        href={actionHref}
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        {actionLabel}
      </Link>
    </div>
  )
}