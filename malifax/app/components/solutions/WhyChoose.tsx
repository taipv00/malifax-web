"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface WhyChooseProps {
  title: string;
  className?: string;
}

export default function WhyChoose({ title, className = '' }: WhyChooseProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col justify-center items-center self-stretch ${className}`}
    >
      <h2
        className="text-[#181D27] text-center font-['Plus_Jakarta_Sans'] text-[30px] leading-[38px] font-semibold xl:text-[60px] xl:leading-[72px] xl:tracking-[-1.2px]"
      >
        Why Choose
        <p className='text-[#0452D8]'>{title}</p>
      </h2>
    </motion.div>
  );
}


