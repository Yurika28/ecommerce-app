
'use client'
import React from 'react'
import { Comment } from '../UI/type'

interface CommentCardProps {
  comment: Comment
  className?: string
}

export const CommentCard = ({ comment, className = '' }: CommentCardProps) => {
  return (
    <div className={`flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-inner border-gray-200 h-[14rem] ${className}`}>
      <img
        src={`https://api.dicebear.com/7.x/personas/svg?seed=${comment.email}`}
        alt={comment.name}
        className="w-20 h-20 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-lg truncate">{comment.name.toUpperCase()}</p>
        <p className="text-gray-600 line-clamp-4">{comment.body}</p>
      </div>
    </div>
  )
}