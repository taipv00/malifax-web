"use client";
import React from 'react';
import LearnMore from '../LearnMore';

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  isActive?: boolean;
  href?: string;
}

export default function SolutionCard({ icon, title, description, isActive = false, href }: SolutionCardProps) {
  return (
    <div
      className={`
        flex flex-col items-end gap-3 w-[343px] xl:w-[581px] p-3 xl:p-3 rounded-[22px] border border-[#E9EAEB] bg-[#FDFDFD]
        transition-all duration-300 ease-in-out
        ${isActive ? 'scale-100 brightness-100' : 'scale-100 brightness-99.99'}
      `}
    >
      {/* Top section - Icon, Title and Description */}
      <div className={`flex flex-col items-start gap-4 p-6 xl:p-6 rounded-2xl border border-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white flex-1 w-full`}>
        {/* Icon and Title - responsive layout */}
        <div className="flex items-center gap-4 w-full xl:flex-col xl:items-start xl:gap-3">
          <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <img src={`/svgs/home/${icon}.svg`} alt="Service icon" className="w-11 h-11" />
          </div>

          <h3 className="text-[#181D27] max-w-[300px] font-['Plus_Jakarta_Sans'] text-base xl:text-xl font-semibold leading-6 xl:leading-[30px] flex-1 xl:flex-none">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#717680] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5 w-full">
          {description}
        </p>
      </div>

      {/* Button */}
      <LearnMore href={href ?? '#'} />
    </div>
  );
}
