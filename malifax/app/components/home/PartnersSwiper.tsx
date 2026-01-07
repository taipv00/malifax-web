'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { API_URLS } from '@/lib/api-config';

interface Partner {
  name: string;
  logo_src: string;
  website_url: string;
  alt_text: string;
  order_index: number;
}

export default function PartnersSwiper() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch(API_URLS.PARTNERS);
      if (!res.ok) throw new Error(`Failed to load partners API status=${res.status}`);
      const json = await res.json();
      const list: Partner[] = Array.isArray(json?.partners)
        ? json.partners.map((p: any) => ({
            name: p.name,
            logo_src: p.logo_src,
            website_url: p.website_url ?? '',
            alt_text: p.alt_text ?? p.name,
            order_index: p.order_index ?? 1,
          }))
        : [];
      setPartners(list);
    } catch (error) {
      console.error('Error fetching partners:', error);
      // Fallback to empty array
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView="auto"
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        loop={true}
        allowTouchMove={false}
        className="partners-swiper"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={`${partner.name}-${index}`} className="!w-auto">
            <div className="flex-shrink-0 flex w-[200px] h-[55px] px-6 flex-col justify-center items-center gap-[10px] rounded-[100px] border-2 border-[#D5D7DA]">
              {partner.website_url ? (
                <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Image src={partner.logo_src} alt={partner.alt_text} width={200} height={31} className="w-[200px] h-[31px] object-contain" />
                </a>
              ) : (
                <Image src={partner.logo_src} alt={partner.alt_text} width={200} height={31} className="w-[200px] h-[31px] object-contain" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
