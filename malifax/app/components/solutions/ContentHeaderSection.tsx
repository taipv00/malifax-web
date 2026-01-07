"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ContentHeaderSectionProps {
  title: string;
  title2?: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
  maxWidthClassName?: string; // e.g., "max-w-[1194px]" or custom
}

export default function ContentHeaderSection({ 
  title, 
  title2,
  description, 
  titleColor = "text-[#0452D8]",
  maxWidthClassName = "max-w-[1194px]",
}: ContentHeaderSectionProps) {
  return (
    <section className="pt-[72px] xl:pb-2 xl:pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center w-full ${maxWidthClassName} mx-auto`}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-[30px] lg:text-[60px] font-semibold text-center mb-9 font-plus-jakarta ${titleColor} leading-[38px] lg:leading-[72px] xl:tracking-[-1.2px]`}
          >
            {title}
            {title2 && <p className='text-[#181D27]'> {title2}</p>}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`text-[14px] lg:text-[18px] text-center font-plus-jakarta text-[#181D27] font-normal leading-[20px] lg:leading-[28px] w-full ${maxWidthClassName} mx-auto`}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
