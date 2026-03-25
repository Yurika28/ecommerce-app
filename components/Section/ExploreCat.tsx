import React from 'react';
import Button from '../UI/Button';

const ExploreCat = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <div className="grid grid-cols-5 grid-rows-4 gap-2 min-h-[320px] md:min-h-[50vh] md:gap-6">
     
        <div className="flex flex-col items-start justify-between col-start-1 col-end-3 row-start-1 row-end-5 p-4 rounded-lg shadow bg-[#e6e9fa] bg-[url('https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/thumbnail.webp')] bg-contain bg-right bg-no-repeat">
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-base md:text-3xl font-bold leading-snug text-gray-900'>
              FIRST TIME?<br />START EXPLORE!
            </h1>
            <p className='text-gray-600 mt-2 text-[0.6rem] md:text-sm'>
              Explore popular categories!
            </p>
          </div>
          <Button variant="primary" size="small">Sports Accessories</Button>
        </div>

      
        <div className="col-start-3 col-end-5 row-start-1 row-end-3 p-4 rounded-lg shadow bg-[#e8e9eb] bg-[url('https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp')] bg-contain md:bg-auto bg-right bg-no-repeat">
          <Button variant="primary" size="small">Mobile Accessories</Button>
        </div>

   
        <div className=" relative col-start-3 col-end-4 row-start-3 row-end-5 p-2 rounded-lg shadow bg-[#aebbd6] bg-[url('https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp')] bg-contain bg-right bg-no-repeat">
          <Button variant="primary" size="small" className='absolute bottom-1 left-1 md:bottom-2 md:left-2'>Men's Shirts</Button>
        </div>


        <div className=" relative col-start-4 col-end-5 row-start-3 row-end-5 p-2 rounded-lg shadow bg-[#d0e3cc] bg-[url('https://cdn.dummyjson.com/product-images/tops/short-frock/thumbnail.webp')] bg-contain bg-left bg-no-repeat">
          <Button variant="primary" size="small" className='absolute bottom-1 right-0 md:bottom-2 md:right-2'>Woman's Tops</Button>
        </div>

       
        <div className="flex items-end justify-center col-start-5 col-end-6 row-start-1 row-end-5 p-4 rounded-lg shadow bg-[url('https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp')] bg-contain md:bg-auto bg-center">
          <Button variant="primary" size="small">Beauty</Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCat;
