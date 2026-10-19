'use client';

import { useState } from 'react';
import { useWindowStore } from '@/store/windowStore';
import MobileMoreMenu from './MobileMoreMenu';

const primaryApps = [
  { id: 'terminal', label: 'Terminal', icon: '💻' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

export default function MobileTabBar() {
  const { activeAppId, setActiveApp } = useWindowStore();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'calc(70px + env(safe-area-inset-bottom))',
          backgroundColor: 'rgba(15, 20, 25, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(45, 55, 72, 0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          padding: '8px 8px calc(8px + env(safe-area-inset-bottom))',
          zIndex: 9999,
        }}
      >
        {primaryApps.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveApp(app.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 4,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 28,
                filter: activeAppId === app.id ? 'none' : 'grayscale(100%) opacity(0.5)',
                transition: 'filter 0.2s',
              }}
            >
              {app.icon}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: activeAppId === app.id ? '#00ff9f' : '#9ca3af',
                transition: 'color 0.2s',
              }}
            >
              {app.label}
            </span>
            {activeAppId === app.id && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#00ff9f',
                  borderRadius: '50%',
                  marginTop: 2,
                }}
              />
            )}
          </button>
        ))}
        <button
          onClick={() => setShowMore(true)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: 4,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 28,
            }}
          >
            ⋮⋮⋮
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
            }}
          >
            More
          </span>
        </button>
      </div>

      <MobileMoreMenu
        isOpen={showMore}
        onClose={() => setShowMore(false)}
        onSelectApp={setActiveApp}
      />
    </>
  );
}
