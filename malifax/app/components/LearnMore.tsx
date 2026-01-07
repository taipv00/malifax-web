"use client";
import React from 'react';
import Link from 'next/link';

interface LearnMoreProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  text?: string;
}

export default function LearnMore({ href, onClick, className = "", text = "Learn more" }: LearnMoreProps) {
  const content = (
    <div className={`flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-2xl bg-white hover:bg-gray-50 transition-colors box-border outline outline-1 outline-[#E9EAEB] ${className}`}>
      <img src="/svgs/arrow-right.svg" alt="Arrow right" className="w-9 h-9" />
      <span className="text-[#181D27] text-center font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5">
        {text}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-flex">
      {content}
    </button>
  );
}
