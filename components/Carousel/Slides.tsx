import Button from "../UI/Button"
const Slides =[
        <div className="w-full h-full p-2 gap-2 flex items-center justify-between bg-neutral-200 rounded-[1rem]">
                <div className="flex flex-col justify-center gap-2 md:justify-around items-start h-full ">
                    <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight'>SHOP INTERIOR DECORS</h1>
                    <p className="text-sm md:text-xl font-semibold text-gray-500">50% discount + free shipping</p>
                    <Button variant="secondary" size="large">Click here</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-[80%]">
                    <img
                        className="object-cover w-full h-auto"
                        src="https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
                        alt="interior_decors"
                    />
                    <img
                        className="object-cover w-full h-auto"
                        src="https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
                        alt="interior_decors"
                    />
                    <img
                        className="object-cover w-full h-auto"
                        src="https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp"
                        alt="interior_decors"
                    />
                </div>
         </div>,

        <div className="relative w-full h-full p-2 flex items-center justify-between bg-rose-100 rounded-[1rem]">
            <div className="flex flex-col justify-center gap-2 md:justify-around items-start h-full">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight">Glow Starts with Great Skincare</h1>
                <p className=" text-sm md:text-xl font-semibold text-gray-500">Get 30% off your skincare essentials now</p>
                <Button variant="secondary" size="large" className="z-10">Shop Now</Button>
            </div>
            <div className="relative w-[80%] grid md:grid-cols-2 gap-4 h-">
                <img
                    className="absolute top-2 object-contain w-full h-auto rounded-3xl transform rotate-[-8deg] bg-amber-50"
                    src="https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp"
                    alt="skincare"
                />
                <img
                    className="absolute bottom-1 object-contain w-full h-auto rounded-3xl transform rotate-[10deg]"
                    src="https://images.pexels.com/photos/3373721/pexels-photo-3373721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="skincare"
                />
            </div>
        </div>,

        <div className="relative w-full h-full p-4 flex items-center justify-between bg-pink-100">
            <div className="flex flex-col gap-2 justify-center md:justify-around items-start h-full">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight">Unleash Your Inner Artist</h1>
                <p className="text-sm md:text-xl font-semibold text-gray-500">Makeup palettes, brushes & more — up to 40% off!</p>
                <Button variant="secondary" size="large">Explore Looks</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-2 w-[80%]">
                <img
                    className="object-contain w-full h-auto rounded bg-pink-50 transform rotate-[-8deg]"
                    src="https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
                    alt="skincare1"
                />
                <img
                    className="object-cover w-full h-auto rounded transform md:translate-y-10"
                    src="https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="makeup"
                />
                <img
                    className="object-contain w-full h-auto rounded bg-pink-50 transform rotate-[8deg]"
                    src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
                    alt="skincare"
                />
            </div>
        </div>,

        <div className="relative w-full h-full p-2 flex items-center justify-between bg-green-100 rounded-[1rem]">
            <div className="flex flex-col justify-center md:justify-around items-start gap-2 h-full">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight">Farm-Fresh Veggies at Your Door</h1>
                <p className=" text-sm md:text-xl font-semibold text-gray-500">Organic, seasonal, and delicious. 20% off this week.</p>
                <Button variant="secondary" size="large">Get Fresh</Button>
            </div>
            <div className="relative w-[80%] grid grid-cols-2 gap-2">
                <img
                    className="absolute left-1 object-cover w-full rounded-3xl transform rotate-[-8deg] md:z-10"
                    src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="fresh_veggies"
                />
                <img
                    className=" absolute bottom-1 object-cover w-full rounded-3xl transform md:translate-y-30"
                    src="https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp"
                    alt="fresh_veggies"
                />
            </div>
        </div>,

        <div className="relative w-full h-full p-2 gap-2 flex items-center justify-between bg-indigo-100">
            <div className="flex flex-col justify-center gap-2 md:justify-around items-start h-full">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight">Style That Speaks You</h1>
                <p className="text-sm md:text-xl font-semibold text-gray-500">Trendy outfits with up to 60% off — limited time!</p>
                <Button variant="secondary" size="large">Browse Styles</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-2 w-[80%]">
                <img
                    className="object-cover w-full h-auto rounded bg-indigo-50 transform translate-y-10 rotate-[-8deg]"
                    src="https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp"
                    alt="clothing"
                />
                <img
                    className="z-10 object-cover w-full h-auto rounded"
                    src="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="clothing"
                />
                <img
                    className="object-cover w-full h-auto rounded bg-indigo-50 transform translate-y-[-10] rotate-[8deg]"
                    src="https://cdn.dummyjson.com/product-images/tops/tartan-dress/thumbnail.webp"
                    alt="clothing"
                />
            </div>
        </div>,

        <div className="relative w-full h-full p-2 gap-2 flex items-center justify-between bg-gray-100">
            <div className="flex flex-col justify-center gap-2 md:justify-around items-start h-full py-12">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight">Step Into Comfort & Style</h1> 
                <p className="text-sm md:text-xl font-semibold text-gray-500">Sneakers, boots, and slides — up to 35% off today!</p>
                <Button variant="secondary" size="large">Step In</Button>
            </div>
            <div className="relative w-[80%] grid md:grid-cols-2 gap-2 items-center">
                <img
                    className="object-cover w-full h-auto rounded bg-gray-50 transform rotate-[-8deg]"
                    src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="footwear"
                />
                <img
                    className="object-cover w-full h-auto rounded bg-gray-50 transform rotate-[-8deg]"
                    src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="footwear"
                />
            </div>
        </div>

]
export default Slides