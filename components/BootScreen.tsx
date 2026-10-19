'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onBootComplete: () => void;
}

const bootSteps = [
  'HANIFOS v1.0.0 booting...',
  '[ OK ] Starting network services',
  '[ OK ] Initializing firewall',
  '[ OK ] Loading cloud infrastructure',
  '[ OK ] Starting CI/CD pipeline',
  '[ OK ] Security modules loaded',
  'System ready. Welcome, visitor.',
];

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < bootSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(onBootComplete, 200);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [currentStep, onBootComplete]);

  const handleSkip = () => {
    onBootComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono"
        style={{ backgroundColor: '#0a0e14' }}
      >
        <div className="w-full max-w-2xl px-8">
          <div className="mb-8 text-2xl font-bold" style={{ color: '#00ff9f' }}>
            IKBAROS BOOT LOADER
          </div>
          
          <div className="space-y-2 text-sm">
            {bootSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: 0,
                }}
                transition={{ 
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1]
                }}
                style={{
                  color: index <= currentStep ? '#e6edf3' : '#6b7280'
                }}
              >
                {step}
                {index === currentStep && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  >
                    _
                  </motion.span>
                )}
                {index === bootSteps.length - 1 && index === currentStep && (
                  <motion.span
                    initial={{ scale: 1, color: '#6b7280' }}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      color: ['#6b7280', '#00ff9f', '#e6edf3']
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="mt-12 px-6 py-2 border transition-colors duration-200"
            style={{
              borderColor: '#00ff9f',
              color: '#00ff9f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00ff9f';
              e.currentTarget.style.color = '#0a0e14';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#00ff9f';
            }}
            aria-label="Skip boot sequence"
          >
            Press any key to skip...
          </motion.button>
        </div>

        <div className="absolute bottom-8 text-xs" style={{ color: '#6b7280' }}>
          System Initialized
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
