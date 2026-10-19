'use client';

import { useWindowStore } from '@/store/windowStore';

export default function MobileHomeIndicator() {
  const { setActiveApp } = useWindowStore();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 140,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 100,
        cursor: 'pointer',
        zIndex: 10001,
      }}
      onClick={() => setActiveApp(null)}
      aria-label="Home"
    />
  );
}
