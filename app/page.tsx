import Header from "@/components/Header/Header";
import Carousel from '@/components/Carousel/page'
import HeaderCategory from "@/components/UI/HeaderCategory";
import DealOfTheDay from '@/components/Section/DealOfTheDay'
import PromoProductsGrid from "@/components/Section/PromoProductsGrid";
import WhatCostumersSay from "@/components/Costumers/WhatCostumersSay";
import CouponGrid from "@/components/Section/Coupon";
import ExploreCat from "@/components/Section/ExploreCat";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header/>
      <HeaderCategory/>  
      <Carousel/>
      <PromoProductsGrid products="fragranceUrl" titlePromo="LUXURY BRAND DAY"/>
      <PromoProductsGrid products='mensShoesUrl'titlePromo="BRANDED MEN SHOES"/>
      <DealOfTheDay/>
      <PromoProductsGrid products = 'mobileAccessoriesUrl' titlePromo="EXPLORE MOBILE ACCESORIES"/>
      <ExploreCat/>
      <PromoProductsGrid products='homeDecorationUrl' titlePromo="BEST DEAL OF HOME DECORS"/>
      <CouponGrid/>
      <WhatCostumersSay/>
      <Footer/>
    </div>
  );
}
