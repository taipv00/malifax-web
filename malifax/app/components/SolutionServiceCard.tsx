import React from 'react';
import Image from 'next/image';

interface SolutionServiceCardProps {
  title: string;
}

const SolutionServiceCard: React.FC<SolutionServiceCardProps> = ({
  title,
}) => {
  return (
    <div className="flex h-[146px] p-3 flex-col items-end gap-3 self-stretch rounded-[22px] border border-[#E9EAEB] bg-[#FDFDFD]">
      <div className="flex p-4 items-center gap-4 flex-1 self-stretch rounded-2xl border border-[#E9EAEB] bg-gradient-to-tr from-[#ECF9FF] to-white">
        <Image
          src="/svgs/tag36_36.svg"
          alt="Service Icon"
          width={36}
          height={36}
        />
        <span className="text-[#181D27] font-plus-jakarta text-xl font-semibold leading-[30px]">
          {title}
        </span>
      </div>
    </div>
  );
};

export default SolutionServiceCard;
