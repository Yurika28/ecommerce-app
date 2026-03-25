
import Countdown from '../UI/Countdown'


const FUTURE_DATE = new Date('2025-07-30T23:59:59').getTime();

const HomeGrid = () => {

  return (
    <>
      <h1 className='text-lg md:text-3xl font-bold px-4 mt-2 text-neutral-600'>DEAL OF THE DAY</h1>
      <p className='text-sm md:text-base px-4 text-neutral-500 mb-2'>Don't miss out — grab the best deals before they're gone!</p>

      <div className="grid grid-cols-4 grid-rows-6 gap-1 md:gap-4 p-4 h-[350px] md:h-[700px]">
        
        <div className="bg-neutral-200 p-4 rounded-2xl col-span-2 row-span-3 flex flex-col items-center justify-center text-center cursor-pointer">
          <img
            src="https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/thumbnail.webp"
            alt="Sunglasses"
            className="object-cover w-full h-[80%] z-10"
          />
          <p className="mt-4 font-bold text-sm md:text-lg">TODAY DEAL !</p>
          <p className="text-xs md:text-base text-gray-600">UP TO 30% OFF</p>
        </div>

        
        <div className="bg-neutral-200 p-4 rounded-2xl col-start-3 col-end-4 row-start-1 row-end-4 cursor-pointer">
          <img
            src="https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp"
            alt="iPhone"
            className="w-full h-full object-contain"
          />
        </div>

        
        <div className="bg-neutral-200 p-4 rounded-2xl col-start-4 col-end-5 row-span-3 cursor-pointer">
          <img
            src="https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
            alt="Chair"
            className="w-full h-full object-contain md:object-cover rounded-xl"
          />
        </div>

      
        <div className="bg-neutral-200 p-4 rounded-2xl col-start-1 col-end-2 row-start-4 row-end-7 cursor-pointer">
          <img
            src="https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/thumbnail.webp"
            alt="Shoes"
            className="w-full h-full object-contain"
          />
        </div>

        
        <div className="bg-neutral-200 p-4 rounded-2xl col-start-2 col-end-3 row-start-4 row-end-7 cursor-pointer">
          <img
            src="https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/thumbnail.webp"
            alt="Women Bag"
            className="w-full h-full object-contain md:object-cover rounded-xl"
          />
        </div>
        <div className="bg-yellow-50 p-2 md:p-4 rounded-2xl col-start-3 col-end-5 row-start-4 row-end-7 flex flex-col cursor-pointer">

          
          <Countdown targetDate={FUTURE_DATE} />

          
          <div className="flex flex-row justify-between items-start md:items-center flex-grow py-4 md:px-8 mt-0 md:mt-4">
            
            
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-[0.8rem] md:text-2xl font-semibold">
                Exclusive Deals
              </h3>

              <button className="bg-yellow-300 hover:bg-yellow-400 text-black text-[0.5rem] md:text-base px-2 py-2 md:px-4 md:py-2 md:mt-2 rounded-full flex items-center cursor-pointer">
                Shop Now →
              </button>
            </div>

            
            <div className="flex justify-center items-center h-full">
              <img
                src="https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp"
                alt="Honey Jar"
                className="object-contain max-h-20 md:max-h-52 w-auto"
              />
            </div>
          </div>
        </div>

        
      


      </div>
    </>
    
  );
};

export default HomeGrid;
