import React from 'react';
import Image from 'next/image';

interface ServiceItem {
  image: string;
  title: string;
  description: string;
}

interface ServicesListProps {
  items: ServiceItem[];
}

export default function ServicesList({ items }: ServicesListProps) {
  const ServiceCard = ({ image, title, description }: ServiceItem) => (
    <div className="flex xl:min-h-[620px] flex-col p-3 gap-3 items-end self-stretch rounded-[22px] bg-[#FDFDFD] box-border outline outline-1 outline-[#E9EAEB]">
      <div className="flex h-full flex-col p-[10px] pt-6 gap-4 items-center self-stretch rounded-2xl bg-[linear-gradient(247deg,#FFF_0%,#ECF9FF_100%)] box-border outline outline-1 outline-[#E9EAEB]">
        {/* Image */}
        <div className="w-[200px]  px-[49.5px]  w-full">
          <Image
            src={image}
            alt={title}
            width={336}
            height={268}
            className="w-full h-full xl:w-full xl:h-auto object-cover xl:object-contain"
          />
        </div>
        
        {/* Content */}
        <div className="flex px-[14px] pb-[14px] flex-col gap-6 items-start self-stretch">
          {/* Title */}
          <h3 className="self-stretch font-['Plus_Jakarta_Sans'] text-xl xl:text-xl font-semibold text-[#181D27] leading-6 xl:leading-[30px]">
            {title}
          </h3>
          
          {/* Description */}
          <p className="self-stretch font-['Plus_Jakarta_Sans'] text-sm font-normal text-[#717680] leading-5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-[27px] w-full max-w-[375px] xl:max-w-[1194px] mx-auto">
      {items.map((item, index) => (
        <ServiceCard
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
