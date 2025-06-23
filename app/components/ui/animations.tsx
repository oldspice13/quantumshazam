import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface AnimationProps {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
}

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: AnimationProps;
  className?: string;
}

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
}

interface AnimatedProgressProps {
  value: number;
  className?: string;
}

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

export const glowPulse = {
  initial: { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(255, 255, 255, 0)',
      '0 0 20px 10px rgba(255, 255, 255, 0.3)',
      '0 0 0 0 rgba(255, 255, 255, 0)',
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
  },
};

export const shimmer = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: ['0% 0', '200% 0'],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear',
  },
};

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  animation = fadeIn, 
  className = '' 
}) => (
  <motion.div
    initial={animation.initial}
    animate={animation.animate}
    exit={animation.exit}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0, className = '' }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={className}
  >
    {text}
  </motion.span>
);

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ value, className = '' }) => (
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${value}%` }}
    transition={{ duration: 1, ease: 'easeOut' }}
    className={className}
  />
);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, className = '' }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={className}
  >
    {children}
  </motion.button>
); 