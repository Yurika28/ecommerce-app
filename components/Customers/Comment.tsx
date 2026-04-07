
'use client'
import React from 'react'
import Image from 'next/image'
import { Comment } from '../subComp/commentType'

interface CommentCardProps {
  comment: Comment
  className?: string
}

export const CommentCard = ({ comment, className = '' }: CommentCardProps) => {
  return (
    <div className={`flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg shadow-inner border-gray-200 h-[14rem] ${className}`}>
      <Image
        src={`https://api.dicebear.com/7.x/personas/svg?seed=${comment.email}`}
        alt={comment.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-lg truncate">{comment.name.toUpperCase()}</p>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-4">{comment.body}</p>
      </div>
    </div>
  )
}
