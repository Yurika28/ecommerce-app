"use client";

import { beautyCat, womenCat, menCat, deviceCat, autoMobileCat, homeCat, sportsCat, groceriesCat } from "../UI/Categories";
import Link from 'next/link';

type DropdownProps = {
  mainCat: string;
  open: boolean;
}

const getSubcategories = (mainCat: string): string[] => {
  switch (mainCat.toLowerCase()) {
    case "women": return womenCat;
    case "men": return menCat;
    case "beauty": return beautyCat;
    case "devices": return deviceCat;
    case "automobile": return autoMobileCat;
    case "home decors": return homeCat;
    case "sports": return sportsCat;
    case "groceries": return groceriesCat;
    default: return [];
  }
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
          {sub.replace(/-/g, " ").toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;
