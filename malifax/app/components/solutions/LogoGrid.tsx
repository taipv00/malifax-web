"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoGridProps {
  // Explicit API: each icon has a position and size
  // position is 0-based slot index
  // size: 1 => occupies 1 cell, 2 => occupies 2 cells (blocks next slot)
  icons: Array<{
    position: number;
    src: string;
    alt?: string;
    size?: number;
    imgWidth?: number;
    imgHeight?: number;
    bgClassName?: string;
  }>;
  totalSlots?: number; // total number of slots to render (default auto)
  containerClassName?: string; // extra classes for outer container
  cellSizePx?: number; // base cell size (default 100)
  gapPx?: number; // gap between cells (default 12 ~ gap-3)
}

// Renders a flex-wrap grid with N px cells. Wide items occupy 2 cells + 1 gap.
const LogoGrid: React.FC<LogoGridProps> = ({
  icons,
  totalSlots,
  containerClassName = '',
  cellSizePx = 100,
  gapPx = 12,
}) => {
  // Map positions to icons for O(1) access
  const positionToIcon = new Map<number, LogoGridProps['icons'][number]>();
  for (const icon of icons) {
    positionToIcon.set(icon.position, icon);
  }
  const desiredTotal = totalSlots ?? Math.max(36, icons.length * 2); // safe default
  const blockedPositions = new Set<number>();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col justify-center items-center w-full max-w-[1440px] mx-auto ${containerClassName}`}
    >
      <div
        className="flex flex-wrap justify-center items-center w-full"
        style={{ gap: `${gapPx}px` }}
      >
        {Array.from({ length: desiredTotal }, (_, index) => {
          if (blockedPositions.has(index)) return null;
          const icon = positionToIcon.get(index);
          const hasIcon = Boolean(icon);
          const size = icon?.size === 2 ? 2 : 1;
          const cellWidth = size === 2 ? cellSizePx * 2 + gapPx : cellSizePx;
          const cellHeight = cellSizePx;
          const bgClass = hasIcon ? (icon?.bgClassName ?? 'bg-[rgb(4,82,216)]') : 'bg-[#F5F5F5]';
          // subtle tone variation by index
          const tone = index % 3;
          const toneClass = tone === 0 ? 'brightness-[1.01]' : tone === 1 ? 'brightness-[1.02]' : 'brightness-[1.03]';
          // shadows: strong drop-shadow for cells with logos, ultra-light shadow otherwise
          const cellShadowClass = hasIcon
            ? 'drop-shadow-[0_24px_48px_rgba(10,69,158,0.18)]'
            : 'shadow-[0_2px_4px_-2px_rgba(10,69,158,0.03),0_1px_2px_-2px_rgba(10,69,158,0.02)]';

          if (hasIcon && size === 2) {
            blockedPositions.add(index + 1);
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.02 * index }}
              className={`flex-none rounded-lg flex items-center justify-center ${bgClass} ${toneClass} ${cellShadowClass}`}
              style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
            >
              {hasIcon && (
                <Image
                  src={icon!.src}
                  alt={icon!.alt ?? 'Logo'}
                  width={icon!.imgWidth ?? (size === 2 ? 120 : 60)}
                  height={icon!.imgHeight ?? 60}
                  className="object-contain"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LogoGrid;


