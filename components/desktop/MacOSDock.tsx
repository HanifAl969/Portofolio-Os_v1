'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

const apps = [
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'certs', label: 'Certificates', icon: '🎓' },
  { id: 'terminal', label: 'Terminal', icon: '💻' },
  { id: 'network', label: 'Network', icon: '🌐' },
  { id: 'pipeline', label: 'Pipeline', icon: '🔄' },
  { id: 'labs', label: 'Lab Notes', icon: '📝' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

export default function MacOSDock() {
  const { openWindow, focusWindow, windows } = useWindowStore();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const handleAppClick = (appId: string, label: string) => {
    const existingWindow = windows.find((w) => w.app === appId && w.isOpen);
    if (existingWindow) {
      focusWindow(existingWindow.id);
    } else {
      openWindow(appId, label);
    }
  };

  const isAppRunning = (appId: string) => {
    return windows.some((w) => w.app === appId && w.isOpen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9998,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(26, 31, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 255, 159, 0.1)',
          borderRadius: 16,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {apps.map((app) => (
          <div key={app.id} style={{ position: 'relative' }}>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredApp(app.id)}
              onHoverEnd={() => setHoveredApp(null)}
              onClick={() => handleAppClick(app.id, app.label)}
              style={{
                width: 48,
                height: 48,
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                fontSize: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s',
              }}
              aria-label={app.label}
            >
              <div
                style={{
                  filter: isAppRunning(app.id) ? 'drop-shadow(0 0 8px rgba(0, 255, 159, 0.5))' : 'none',
                  transition: 'filter 0.2s',
                }}
              >
                {app.icon}
              </div>
            </motion.button>
            {isAppRunning(app.id) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: -4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  backgroundColor: '#00ff9f',
                  borderRadius: '50%',
                }}
              />
            )}
            {hoveredApp === app.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: 8,
                  padding: '6px 12px',
                  backgroundColor: 'rgba(15, 20, 25, 0.95)',
                  border: '1px solid #2d3748',
                  borderRadius: 6,
                  fontSize: 12,
                  color: '#e6edf3',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
              >
                {app.label}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
