'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { getGradient } from '@/utils/wallpaper';

const gridApps = [
  { id: 'camera', label: 'Camera', emoji: '📷' },
  { id: 'notes', label: 'Notes', emoji: '🗒️' },
  { id: 'certs', label: 'Certs', emoji: '🎓' },
  { id: 'network', label: 'Network', emoji: '🌐' },
  { id: 'pipeline', label: 'Pipeline', emoji: '🔄' },
  { id: 'labs', label: 'Lab Notes', emoji: '📝' },
];

const dockApps = [
  { id: 'about', label: 'About', emoji: '👤' },
  { id: 'projects', label: 'Projects', emoji: '📁' },
  { id: 'contact', label: 'Contact', emoji: '📧' },
  { id: 'settings', label: 'Settings', emoji: '⚙️' },
];

export default function MobileHomeScreen() {
  const { setActiveApp, theme } = useWindowStore();
  const [time, setTime] = useState('');
  const [dateInfo, setDateInfo] = useState({ day: '', date: '' });
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    setGradient(getGradient());
  }, []);

  const getWallpaper = () => {
    return gradient || getGradient();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateInfo({
        day: now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
        date: now.getDate().toString()
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: getWallpaper(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflowX: 'hidden',
        overflowY: 'auto',
        transition: 'background 0.5s ease',
      }}
    >
      {/* Status Bar */}
      <div
        style={{
          height: 44,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 32px',
          color: '#fff',
          fontSize: 15,
          fontWeight: 600,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div>{time}</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span>📶</span>
          <span>⚡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Widgets Area */}
      <div
        style={{
          padding: '24px 16px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {/* Calendar Widget */}
        <div
          style={{
            aspectRatio: '1/1',
            backgroundColor: '#fff',
            borderRadius: 32,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ color: '#ff3b30', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            {dateInfo.day}
          </div>
          <div style={{ color: '#000', fontSize: 72, fontWeight: 700, letterSpacing: '-2px' }}>
            {dateInfo.date}
          </div>
        </div>

        {/* Clock Widget */}
        <div
          style={{
            aspectRatio: '1/1',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            borderRadius: 32,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ color: '#fff', fontSize: 48, fontWeight: 600 }}>
            {time}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 6, fontWeight: 600 }}>
            HANIFOS
          </div>
        </div>
      </div>

      {/* Grid Apps */}
      <div
        style={{
          padding: '0 12px 140px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '28px 8px',
        }}
      >
        {gridApps.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveApp(app.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {app.emoji}
            </div>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 500, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* Floating Dock */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          left: 12,
          right: 12,
          height: 90,
          backgroundColor: 'rgba(255, 255, 255, 0.28)',
          backdropFilter: 'blur(45px) saturate(190%)',
          borderRadius: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 12px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.25)',
          zIndex: 100,
        }}
      >
        {dockApps.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveApp(app.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {app.emoji}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
