"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TagProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Tag({ text, className = '', children }: TagProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`inline-flex p-2 pr-5 w-fit justify-center items-center gap-2.5 rounded-full outline outline-1 outline-white bg-white/30 backdrop-blur-sm ${className}`}
    >
      {/* Icon */}
      <div className="">
        {/* Mobile icon */}
        <Image
          src="/svgs/tag28_28.svg"
          alt="Tag Icon"
          width={28}
          height={28}
          className="lg:hidden" 
        />
        {/* Desktop icon */}
        <Image
          src="/svgs/tag36_36.svg"
          alt="Tag Icon"
          width={36}
          height={36}
          className="hidden lg:block"
        />
      </div>
      
      {/* Text */}
      <span className="text-white text-center font-plus-jakarta font-semibold text-base leading-6 tracking-normal lg:text-[20px] lg:leading-[30px] lg:font-semibold">
        {text}
      </span>
      
      {/* Additional children content */}
      {children}
    </motion.div>
  );
} 