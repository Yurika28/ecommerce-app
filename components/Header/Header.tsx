import Link from 'next/link'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import SearchBar from './searchBar'
import AuthNav from '../subComp/AuthNav'
import CartBadge from '../subComp/CartBadge'
import WishlistBadge from '../subComp/WishlistBadge'
import ThemeToggle from '../subComp/ThemeToggle'

export default function Header() {
  return (
    <header className='w-full px-4 py-4'>
      <div className='max-w-full mx-auto flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between gap-4'>

        <Link href='/' className='text-3xl lg:text-4xl font-bold tracking-wide'>
          WHOLSALE
        </Link>

        <div className='w-full lg:w-1/2'>
          <SearchBar />
        </div>

        <div className='hidden lg:flex items-center justify-between w-auto'>
          <div className='flex items-center gap-3 md:gap-5'>
            <Link href='/cart'>
              <CartBadge>
                <ShoppingCartIcon className='h-6 w-6 cursor-pointer hover:text-gray-600' />
              </CartBadge>
            </Link>
            <Link href='/wishlist'>
              <WishlistBadge>
                <HeartIcon className='h-6 w-6 cursor-pointer hover:text-gray-600' />
              </WishlistBadge>
            </Link>
            <ThemeToggle />
          </div>
          <AuthNav />
        </div>

      </div>
    </header>
  )
}
