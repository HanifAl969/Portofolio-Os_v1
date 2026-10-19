'use client';

import { useState, useEffect } from 'react';

interface MenuBarProps {
  onCycleWallpaper?: () => void;
}

export default function MenuBar({ onCycleWallpaper }: MenuBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      setTime(formatted);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        backgroundColor: '#0f1419',
        borderBottom: '1px solid #2d3748',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 9998,
      }}
      className="font-mono"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ color: '#00ff9f', fontSize: 16, fontWeight: 700 }}>
          HANIFOS
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }} className="menu-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#e6edf3', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00ff9f'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#e6edf3'}
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#e6edf3', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00ff9f'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#e6edf3'}
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          {onCycleWallpaper && (
            <button
              onClick={onCycleWallpaper}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#e6edf3',
                cursor: 'pointer',
                fontSize: 13,
                padding: 0,
                transition: 'color var(--duration-fast), transform var(--duration-fast) var(--ease-out)',
              }}
              onMouseEnter={(e) => {
                if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                  e.currentTarget.style.color = '#00ff9f';
                }
              }}
              onMouseLeave={(e) => e.currentTarget.style.color = '#e6edf3'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              aria-label="Change Wallpaper"
            >
              🎨 Wallpaper
            </button>
          )}
        </div>
      </div>
      
      <div style={{ color: '#e6edf3', fontSize: 13 }}>
        {time || '--:--'}
      </div>
    </div>
  );
}
