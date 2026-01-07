'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/autoplay';
import { Navigation, EffectCreative, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import LearnMore from '../LearnMore';
import { API_URLS } from '@/lib/api-config';

interface ShopProduct {
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  website_url?: string;
}

interface ShopSwiperProps {
  swiperRef: React.RefObject<SwiperType | null>;
}

function ShopProductItem({ product, index }: { product: ShopProduct; index: number }) {
  return (
    <div
      className={`flex  flex-col items-end gap-3 p-3 rounded-[22px] bg-gray-50 shadow-none xl:shadow-[0_32px_64px_-12px_rgba(10,69,158,0.14)] xl:w-full w-[330px] xl:max-w-[388.333px] box-border border border-gray-200 h-[300px] xl:h-auto ${
        index % 2 === 0 ? 'xl:translate-y-22' : ''
      }`}
    >
      <div className="flex flex-col h-full justify-center items-start gap-4 p-6 rounded-2xl bg-gradient-to-tr from-blue-50 to-white self-stretch box-border outline outline-1 outline-gray-200">
        <h3 className="self-stretch font-['Plus_Jakarta_Sans'] font-semibold text-xl text-gray-900 leading-[30px]">
          {product.title}
        </h3>
        
        <p className="self-stretch text-gray-500 text-sm font-normal leading-5">
          {product.description}
        </p>
      </div>
      
      <div className="flex p-1.5 justify-between items-center self-stretch rounded-2xl bg-white box-border border border-gray-200">
        <div className="flex-1">
          <div className="relative h-12 flex items-center justify-start">
            <Image
              src={product.logo}
              alt={product.logoAlt}
              width={48}
              height={48}
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
        
        <LearnMore text="Shop Now" href={product.website_url ? product.website_url : undefined} />
      </div>
    </div>
  );
}

export default function SwiperDemo({ swiperRef }: ShopSwiperProps) {
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URLS.SHOP_PRODUCTS);
        console.log(res);
        if (!res.ok) throw new Error(`Failed to load shop products, status=${res.status}`);
        const json = await res.json();
        const list: ShopProduct[] = Array.isArray(json?.shopProducts)
          ? json.shopProducts.map((p: any) => ({
              title: p.title,
              description: p.description ?? '',
              logo: p.logo_src,
              logoAlt: p.logo_alt ?? p.title,
              website_url: p.website_url,
            }))
          : [];
        setShopProducts(list);
      } catch (e) {
        console.error('Error fetching shop products:', e);
        setShopProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop-swiper-container w-full md:max-w-[700px] xl:max-w-[1270px] mx-auto">
        <div className="py-10 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shop-swiper-container w-full md:max-w-[700px] xl:max-w-[1270px] mx-auto">
      <Swiper
        freeMode={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          
        }}
        grabCursor={true}
        effect={'creative'}
        modules={[Navigation, EffectCreative, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        slidesPerView={3}
        creativeEffect={{
          prev: {
            translate: ["100%", 0, -400],
            scale: 0.8,
            opacity: 0,
          },
          next: {
            translate: ['100%', 0, 0],
          },
          limitProgress: 3,
          progressMultiplier: 1.095,

        }}
        breakpoints={{
          320: { 
            slidesPerView: 2, 
          },
          768: { 
            slidesPerView: 2, 
            spaceBetween: 25
          },
          1280: { 
            slidesPerView: 3, 
            spaceBetween: 32
          } 
         
        }}
      >
        {shopProducts.map((product, index) => (
          <SwiperSlide key={`${product.title}-${index}`} className='h-full min-h-[290px] xl:min-h-[420px]'>
            <ShopProductItem product={product} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
