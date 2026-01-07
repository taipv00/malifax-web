import React from 'react';

interface IconTextProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export default function IconText({ text, className = '', children }: IconTextProps) {
  return (
    <div 
      className={`flex items-center gap-2 lg:gap-4 ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {/* Icon Container */}
      <div 
        className="flex justify-center items-center rounded-full border border-white bg-white/30 backdrop-blur-sm w-12 h-12 lg:w-[76px] lg:h-[76px] lg:p-2"
        style={{
          display: 'flex',
          padding: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '100px',
          border: '1px solid #FFF',
          background: 'rgba(253, 253, 253, 0.30)',
        }}
      >
        {/* Inner Icon */}
        <div 
          className="flex justify-center items-center rounded-full bg-blue-700 w-8 h-8 lg:w-[56px] lg:h-[56px] lg:p-6"
          style={{
            display: 'flex',
            padding: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
            aspectRatio: '1/1',
            borderRadius: '200px',
            background: '#0452D8',
          }}
        >
          <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24">
            <path 
              d="M12 2L2 7L12 12L22 7L12 2Z" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M2 17L12 22L22 17" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M2 12L12 17L22 12" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {/* Text */}
      <span 
        className="text-white text-lg sm:text-2xl md:text-3xl lg:text-[72px] leading-tight lg:leading-[90px]"
        style={{
          color: '#FFF',
          fontFamily: '"Plus Jakarta Sans"',
          fontStyle: 'normal',
          fontWeight: 600,
          letterSpacing: '-1.44px',
        }}
      >
        {text}
      </span>
      
      {/* Additional children content */}
      {children}
    </div>
  );
} 