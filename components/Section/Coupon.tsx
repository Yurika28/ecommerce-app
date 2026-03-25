import React from 'react';
import ribbon from '@/components/UI/ribbon-removebg-preview.png';


const coupons = [
  { price: '$.30.00' },
  { price: '$.40.00' },
  { price: '$.80.00' },
  { price: '$100.00' },
];

const CouponCard = ({ price }: { price: string }) => (
  <div className="bg-amber-50 border border-amber-100 rounded-lg w-full max-w-[18rem] aspect-[4/3] flex flex-col justify-end items-center relative overflow-hidden shadow-sm pb-2">
    <img
      src={ribbon.src}
      alt="Ribbon"
      className="absolute inset-0 w-full h-full object-cover opacity-90"
    />
    <div className="relative z-10 text-center">
      <p className="text-md text-gray-600 font-semibold tracking-widest">COUPON</p>
      <h3 className="text-2xl font-bold text-black">{price}</h3>
    </div>
  </div>
);

const CouponGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 justify-items-center">
      {coupons.map((coupon, idx) => (
        <CouponCard key={idx} price={coupon.price} />
      ))}
    </div>
  );
};

export default CouponGrid;
