"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AccessSystemItemProps {
  title: string;
  description: string;
}

const AccessSystemItem: React.FC<AccessSystemItemProps> = ({
  title,
  description,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex w-full max-w-[581px] p-3 flex-col items-end gap-3 rounded-[22px] outline outline-1 outline-[#E9EAEB] bg-[#FDFDFD] self-stretch"
    >
      <div className="flex p-6 h-full flex-col items-start gap-4 self-stretch rounded-2xl outline outline-1 outline-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
        {/* Top Section - Icon and Title */}
        <div className="flex items-center gap-4">
          <Image
            src="/svgs/tag36_36.svg"
            alt="Access System Icon"
            width={36}
            height={36}
          />
          <h3 className="font-plus-jakarta font-semibold text-base xl:text-xl text-[#181D27] leading-6 xl:leading-[30px]">
            {title}
          </h3>
        </div>
        
        {/* Bottom Section - Description */}
        <p className="self-stretch text-[#717680] font-plus-jakarta text-sm font-normal leading-5">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default AccessSystemItem;
