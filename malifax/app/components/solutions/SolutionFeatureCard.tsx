import React from 'react';
import Image from 'next/image';

interface SolutionFeatureCardProps {
  imageSrc: string;
  title: string;
  span?: string;
  description: string;
}

const SolutionFeatureCard: React.FC<SolutionFeatureCardProps> = ({
  imageSrc,
  title,
  span,
  description,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 self-stretch p-3 rounded-[22px] outline outline-1 outline-[#E9EAEB] bg-[#FDFDFD] max-w-[343px] xl:max-w-[380px]">
      <div className="flex flex-col items-center gap-4 self-stretch p-6 rounded-2xl outline outline-1 outline-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
        {/* Image */}
        <div className="relative w-full max-w-[160px] h-[160px] aspect-square lg:max-w-[300px] lg:h-[300px]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Title */}
        <div className="flex items-center gap-1 self-stretch">
          <h3 className="font-plus-jakarta font-semibold text-lg lg:text-xl text-gray-900 text-left w-full">
            {title} {span && <span className="text-[#0452D8]">{span}</span>}
          </h3>
        </div>
        
        {/* Description */}
        <p className="self-stretch text-[#717680] font-plus-jakarta text-sm font-normal leading-5 text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SolutionFeatureCard;
