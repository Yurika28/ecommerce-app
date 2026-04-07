"use client";

import Link from 'next/link';
import { getSubcategories } from '@/components/utils/categories';
import { unslug } from '@/components/utils/slug';

type DropdownProps = {
  mainCat: string;
  open: boolean;
};

const Dropdown = ({ mainCat, open }: DropdownProps) => {
  const subcategories = getSubcategories(mainCat);

  if (!open || subcategories.length === 0) return null;

  return (
    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-52 z-50">
      {subcategories.map((sub) => (
        <Link
          href={`/product/category/${sub}`}
          key={sub}
          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
        >
          {unslug(sub).toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;
