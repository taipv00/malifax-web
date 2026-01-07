"use client";
import React from 'react';
import LearnMore from '../LearnMore';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-3 xl:gap-3 w-[343px] xl:w-[581px] p-3 xl:p-3 rounded-[22px] xl:rounded-[22px] bg-white box-border outline outline-1 outline-[#E9EAEB] flex-1">
      {/* Inner border with gradient background */}
      <div className="flex flex-col gap-4 xl:gap-4 w-[319px] xl:w-[557px] p-6 xl:p-6 rounded-2xl xl:rounded-2xl bg-gradient-to-tr from-[#ECF9FF] to-white box-border outline outline-1 outline-[#E9EAEB] flex-1">
        {/* Header section with icon, title and button (desktop) */}
        <div className="flex items-center justify-between gap-3 xl:gap-3">
          {/* Icon and Title - on same line for both mobile and desktop */}
          <div className="flex items-center gap-4 xl:gap-3 flex-1">
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <img src={`/svgs/${icon}.svg`} alt="Service icon" className="w-9 h-9" />
            </div>
            
            {/* Title */}
            <h3 className="text-[#181D27] font-['Plus_Jakarta_Sans'] text-base xl:ml-[3px] xl:text-xl font-semibold leading-6 xl:leading-[30px] tracking-[0%] flex-1">
              {title}
            </h3>
          </div>
          
          {/* Learn More Button - only visible on desktop */}
          <div className="hidden xl:block">
            <LearnMore href={href} />
          </div>
        </div>
        
        {/* Description */}
        <div className="flex-1">
          <p className="text-[#717680] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5 w-full">
            {description}
          </p>
        </div>
        
        {/* Learn More Button - only visible on mobile, at bottom left */}
        <div className="xl:hidden flex justify-start">
          <LearnMore href={href} />
        </div>
      </div>
    </div>
  );
}
