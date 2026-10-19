'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (appId: string) => void;
}

const moreApps = [
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'certs', label: 'Certificates', icon: '🎓' },
  { id: 'network', label: 'Network', icon: '🌐' },
  { id: 'pipeline', label: 'Pipeline', icon: '🔄' },
  { id: 'labs', label: 'Lab Notes', icon: '📝' },
];

export default function MobileMoreMenu({ isOpen, onClose, onSelectApp }: MobileMoreMenuProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <motion.div
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            backgroundColor: '#0f1419',
            borderRadius: '24px 24px 0 0',
            padding: '24px 16px calc(24px + env(safe-area-inset-bottom))',
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              backgroundColor: '#2d3748',
              borderRadius: 2,
              margin: '0 auto 24px',
            }}
          />
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#e6edf3',
              marginBottom: 20,
            }}
          >
            More Apps
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
          >
            {moreApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onSelectApp(app.id);
                  onClose();
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#1a1f2e',
                    border: '2px solid #2d3748',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                  }}
                >
                  {app.icon}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: '#e6edf3',
                    textAlign: 'center',
                  }}
                >
                  {app.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
