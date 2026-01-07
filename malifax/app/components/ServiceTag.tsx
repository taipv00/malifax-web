import React from 'react';
import Image from 'next/image';

interface ServiceTagProps {
  title: string;
  className?: string;
}

export default function ServiceTag({ title, className = '' }: ServiceTagProps) {
  return (
    <div className={`w-full flex p-3 flex-col items-end gap-3 rounded-[22px] outline outline-1 outline-[#E9EAEB] bg-[#FDFDFD] ${className}`}>
      <div className="w-full flex p-4 items-center gap-4 self-stretch rounded-2xl outline outline-1 outline-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
        {/* Left side - Icon */}
        <div className="flex-shrink-0">
          <Image
            src="/svgs/tag36_36.svg"
            alt="Service Icon"
            width={36}
            height={36}
            className="w-9 h-9"
          />
        </div>
        
        {/* Right side - Title */}
        <div className="flex-1">
          <h3 className="text-[#181D27] font-['Plus_Jakarta_Sans'] text-xl font-semibold leading-[30px]">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
