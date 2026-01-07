'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  margin?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

const directionVariants = {
  up: { y: 50 },
  down: { y: -50 },
  left: { x: 50 },
  right: { x: -50 },
  fade: { opacity: 0 }
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  margin = '-100px',
  stagger = false,
  staggerDelay = 0.1
}: AnimatedSectionProps) {
  const initialProps = directionVariants[direction];
  
  const motionProps: MotionProps = {
    initial: { opacity: 0, ...initialProps },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay }
  };

  if (stagger && Array.isArray(children)) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay
            }
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps} className={className}>
      {children}
    </motion.div>
  );
}

// Stagger item component
export function AnimatedItem({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5
}: Omit<AnimatedSectionProps, 'stagger' | 'staggerDelay' | 'margin'>) {
  const initialProps = directionVariants[direction];
  
  return (
    <motion.div
      initial={{ opacity: 0, ...initialProps }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text animation component
export function AnimatedText({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6
}: Omit<AnimatedSectionProps, 'stagger' | 'staggerDelay' | 'margin'>) {
  const initialProps = directionVariants[direction];
  
  return (
    <motion.h2
      initial={{ opacity: 0, ...initialProps }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}

// Button animation component
export function AnimatedButton({
  children,
  className = '',
  onClick,
  delay = 0,
  hoverScale = 1.05,
  tapScale = 0.95
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  hoverScale?: number;
  tapScale?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}
