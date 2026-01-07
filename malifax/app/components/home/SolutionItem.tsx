import React from 'react';

interface SolutionItemProps {
  icon: string;
  text: string;
}

export default function SolutionItem({ icon, text }: SolutionItemProps) {
  return (
    <div className="flex w-64 px-4 py-1.5 pl-1.5 justify-center items-center gap-3 rounded-2xl bg-white box-border outline outline-1 outline-[#E9EAEB]">
      {/* Icon */}
      <div className="w-11 h-11 flex items-center justify-center">
        <img
          src={`/svgs/home/${icon}.svg`}
          alt={text}
          width={44}
          height={44}
          className="w-11 h-11"
        />
      </div>
      
      {/* Text */}
      <div className="flex-1 text-[#181D27] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5">
        {text}
      </div>
    </div>
  );
}
