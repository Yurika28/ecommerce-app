"use client";

import { useState } from "react";
import { mainCats } from "./Categories";
import Dropdown from "./DropDown";

const HeaderMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="w-full flex space-x-4 px-4 py-4 shadow-md"> 
      {mainCats.map((mainCat) => (
        <div
          key={mainCat}
          className="relative"
          onMouseEnter={() => setOpenMenu(mainCat)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="font-semibold lg:font-bold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            {mainCat.toUpperCase()}
          </div>
           <Dropdown mainCat={mainCat} open={openMenu === mainCat} />
        </div>
      ))}
    </div>
  );
};

export default HeaderMenu;
