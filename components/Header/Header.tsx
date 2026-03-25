import React from 'react'
import { MoonIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import HeaderSearch from './HeaderSearch';
import AuthNav from '../UI/AuthNav';

export default function Header() {
  return (
    <header className='w-full px-4 py-4'>
      <div className='max-w-full mx-auto flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between gap-4'>
        <a href='/' className='text-3xl lg:text-4xl font-bold tracking-wide'>WHOLSALE</a>

        <div className='w-full lg:w-1/2'>
          <HeaderSearch />
        </div>

        <div className='hidden lg:flex items-center justify-between w-auto'>
          <div className='flex items-center gap-3 md:gap-5'>
            <ShoppingCartIcon className='h-6 w-6 cursor-pointer hover:text-gray-600' />
            <HeartIcon className='h-6 w-6 cursor-pointer hover:text-gray-600' />
            <MoonIcon className='h-6 w-6 cursor-pointer hover:text-gray-600' />
          </div>

          <AuthNav />
        </div>
      </div>
    </header>
  )
}
