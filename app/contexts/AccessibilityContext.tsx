'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: number;
  reducedMotion: boolean;
  screenReader: boolean;
  toggleHighContrast: () => void;
  setFontSize: (size: number) => void;
  toggleReducedMotion: () => void;
  toggleScreenReader: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedFontSize = Number(localStorage.getItem('fontSize')) || 16;
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const savedScreenReader = localStorage.getItem('screenReader') === 'true';

    setHighContrast(savedHighContrast);
    setFontSize(savedFontSize);
    setReducedMotion(savedReducedMotion);
    setScreenReader(savedScreenReader);
  }, []);

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const newValue = !prev;
      localStorage.setItem('highContrast', String(newValue));
      return newValue;
    });
  };

  const updateFontSize = (size: number) => {
    setFontSize(size);
    localStorage.setItem('fontSize', String(size));
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const newValue = !prev;
      localStorage.setItem('reducedMotion', String(newValue));
      return newValue;
    });
  };

  const toggleScreenReader = () => {
    setScreenReader((prev) => {
      const newValue = !prev;
      localStorage.setItem('screenReader', String(newValue));
      return newValue;
    });
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        reducedMotion,
        screenReader,
        toggleHighContrast,
        setFontSize: updateFontSize,
        toggleReducedMotion,
        toggleScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
} 