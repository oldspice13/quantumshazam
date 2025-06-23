import { motion } from 'framer-motion';
import React from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const AnimatedContainer = ({ children, animation = fadeIn, className = '' }: { children: React.ReactNode; animation?: typeof fadeIn; className?: string }) => (
  <motion.div
    initial={animation.initial}
    animate={animation.animate}
    className={className}
  >
    {children}
  </motion.div>
); 