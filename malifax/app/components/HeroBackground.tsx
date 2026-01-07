'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroBackground({ children, className = '' }: HeroBackgroundProps) {
  return (
    <div className={`relative min-h-screen xl:min-h-[1024px] overflow-visible ${className}`}>
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute mx-2 my-2 lg:mx-[22.5px] lg:my-6 inset-0 rounded-2xl overflow-hidden z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/imgs/main-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          aria-hidden="true"
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen xl:min-h-[1024px] flex flex-col">
        {children}
      </div>
    </div>
  );
} 