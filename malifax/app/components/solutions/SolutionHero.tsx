'use client';
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from '../HeroBackground';
import Tag from '../Tag';
import Title from '../Title';

interface SolutionHeroProps {
  imageSrc: string;
  title: string;
  rightMaxWidth?: string;
  rightMinWidth?: string;
  tagText?: string;
}

export default function SolutionHero({ imageSrc, title, rightMaxWidth = "max-w-[618px]", rightMinWidth = "min-w-[239px]", tagText = "Solutions" }: SolutionHeroProps) {
  return (
    <HeroBackground>
      <div className="flex justify-center flex-1 min-h-0 relative z-10">
        <div className="flex flex-col items-center justify-center xl:flex-row xl:items-center justify-center gap-8 xl:gap-16 max-w-7xl mx-auto px-6 py-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-1 lg:order-1"
          >
            <img
              src={imageSrc}
              alt={title}
              className="w-full max-w-[239px] xl:w-auto xl:h-auto xl:max-w-[500px] object-contain"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex  flex-col items-start gap-4 order-2 lg:order-2 ${rightMinWidth} xl:min-w-[426px] ${rightMaxWidth}`}
          >
            <Tag text={tagText} />
            <Title className="text-4xl lg:text-5xl xl:text-7xl">
              {title}
            </Title>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 right-0 left-0 bottom-0 mx-2 my-2 lg:mx-[22.5px] lg:my-6 z-0">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          src="/imgs/overlay1.png"
          alt="overlay-top-right"
          className="absolute top-0 right-0 object-contain"
        />
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          src="/imgs/overlay2.png"
          alt="overlay-mid-right"
          className="absolute right-[40%] bottom-[20%] object-contain"
        />
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          src="/imgs/overlay3.png"
          alt="overlay-bottom-left"
          className="absolute bottom-0 left-0 object-contain"
        />
      </div>
    </HeroBackground>
  );
}
