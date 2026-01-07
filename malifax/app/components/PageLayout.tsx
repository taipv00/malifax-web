import React from 'react';
import Image from 'next/image';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`relative min-h-screen  ${className}`}>
      {/* Background Image */}
      
      <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
        <Image
          src="/imgs/main-bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 