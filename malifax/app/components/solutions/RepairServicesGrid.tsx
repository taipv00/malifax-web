"use client";
import React from 'react';
import Image from 'next/image';

export interface RepairServiceItem {
  title: string;
  imageSrc: string;
}

interface RepairServicesGridProps {
  items: RepairServiceItem[]; // expect 6-9 items
}

export default function RepairServicesGrid({ items }: RepairServicesGridProps) {
  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-2xl max-w-[343px] md:max-w-none mx-auto md:mx-0">
            <Image
              src={item.imageSrc}
              alt={item.title}
              width={800}
              height={480}
              className="w-full h-[200px] md:h-[240px] xl:h-[220px] object-cover"
            />
            <div className="absolute left-4 bottom-4 bg-[#0A66FF] text-white rounded-xl px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center gap-2">
              <Image src="/svgs/tag36_36_bg.svg" alt="icon" width={36} height={36} className="w-5 h-5" />
              <span className="font-semibold text-sm">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


