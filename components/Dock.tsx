'use client';

import { useWindowStore } from '@/store/windowStore';

export default function Dock() {
  const { windows, focusWindow, minimizeWindow } = useWindowStore();
  const activeWindows = windows.filter((w) => w.isOpen);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#0f1419',
        borderTop: '1px solid #2d3748',
        display: 'flex',
        alignItems: 'center',
        justifyContent: activeWindows.length === 0 ? 'center' : 'flex-start',
        gap: 12,
        padding: '0 16px',
        zIndex: 9999,
        overflowX: 'auto',
      }}
      className="font-mono"
    >
      {activeWindows.length === 0 ? (
        <div style={{ color: '#6b7280', fontSize: 12 }}>
          No applications running
        </div>
      ) : (
        activeWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => {
              if (window.isMinimized) {
                focusWindow(window.id);
              } else {
                minimizeWindow(window.id);
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: window.isMinimized ? '#1a1f2e' : '#00ff9f',
              color: window.isMinimized ? '#e6edf3' : '#0a0e14',
              border: window.isMinimized ? '1px solid #2d3748' : 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              transition: 'background-color var(--duration-base), transform var(--duration-fast) var(--ease-out)',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.97)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseEnter={(e) => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.isMinimized) {
                e.currentTarget.style.backgroundColor = '#2d3748';
              }
            }}
            onMouseLeave={(e) => {
              if (window.isMinimized) {
                e.currentTarget.style.backgroundColor = '#1a1f2e';
              }
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label={`${window.isMinimized ? 'Restore' : 'Minimize'} ${window.title}`}
          >
            {window.title}
          </button>
        ))
      )}
    </div>
  );
}
