"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className = '' }: TitleProps) {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className={`text-white font-['Plus_Jakarta_Sans'] text-4xl font-semibold leading-[44px] tracking-[-0.72px] xl:text-7xl xl:leading-[90px] xl:tracking-[-1.44px] ${className}`}
    >
      {children}
    </motion.h1>
  );
}
