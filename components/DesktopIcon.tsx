'use client';

import { motion } from 'framer-motion';

interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export default function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 8,
        transition: 'background-color var(--duration-fast), transform var(--duration-fast) var(--ease-out)',
        width: 120,
      }}
      onMouseEnter={(e) => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        }
      }}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      className="font-mono"
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          backgroundColor: '#1a1f2e',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          color: '#e6edf3',
          fontSize: 12,
          textAlign: 'center',
          wordBreak: 'break-word',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
        }}
      >
        {label}
      </div>
    </motion.button>
  );
}
