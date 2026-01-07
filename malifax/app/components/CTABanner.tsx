import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CTABannerProps {
  title?: string;
  description?: string | string[];
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export default function CTABanner({ 
  title, 
  description, 
  buttonText, 
  buttonLink = '/contact',
  className = '' 
}: CTABannerProps) {
  return (
    <section className={`relative mx-2  lg:mx-[22.5px] py-15 ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full rounded-2xl overflow-hidden">
        <Image
          src="/imgs/cta-bg.png"
          alt="CTA Background"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="w-full relative z-10 max-w-[327px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1257px] mx-auto text-center">
        {/* Title */}
        {title && (
          <h2 className="text-white font-['Plus_Jakarta_Sans'] font-semibold text-[30px] leading-[38px] tracking-[0%] text-center xl:text-[60px] xl:leading-[72px] xl:tracking-[-0.02em] mb-6 w-full">
            {title}
          </h2>
        )}
        
        {/* Description */}
        {description && (
          <div className="text-white font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[20px] tracking-[0%] text-center xl:font-medium xl:text-[18px] xl:leading-[28px] mb-8 w-full">
            {Array.isArray(description) ? (
              // Multiple paragraphs
              <div className="space-y-4 w-full">
                {description.map((paragraph, index) => (
                  <p key={index} className="w-full">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              // Single paragraph
              <p className="w-full">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Button */}
        {buttonText && (
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center px-[18px] py-[10px] bg-black text-white font-['Plus_Jakarta_Sans'] font-medium text-base rounded-lg border border-black hover:bg-gray-800 transition-colors duration-200"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
