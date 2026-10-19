'use client';

import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function Settings() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif', color: '#e6edf3' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Settings
        </h2>
      )}

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#00ff9f', marginBottom: 16 }}>
          System Information
        </h3>
        <div
          style={{
            backgroundColor: '#0f1419',
            border: '1px solid #2d3748',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'OS Name', value: 'HANIFOS' },
            { label: 'Version', value: '1.0.0' },
            { label: 'Kernel', value: 'Linux 5.15.0-devops' },
            { label: 'Host', value: 'Hanif-Portfolio' },
            { label: 'Uptime', value: '12 days, 4 hours' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: i === 4 ? 'none' : '1px solid #2d3748',
              }}
            >
              <span style={{ color: '#9ca3af', fontSize: 14 }}>{item.label}</span>
              <span style={{ color: '#e6edf3', fontSize: 14, fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#00ff9f', marginBottom: 16 }}>
          Appearance
        </h3>
        <div
          style={{
            backgroundColor: '#0f1419',
            border: '1px solid #2d3748',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div style={{ marginBottom: 12, fontSize: 14, color: '#9ca3af' }}>Wallpaper</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div
              style={{
                width: 60,
                height: 100,
                borderRadius: 8,
                background: 'linear-gradient(45deg, #0061ff, #60efff)',
                border: '2px solid #00ff9f',
                cursor: 'pointer',
              }}
            />
            <div
              style={{
                width: 60,
                height: 100,
                borderRadius: 8,
                background: 'linear-gradient(45deg, #ff00cc, #333399)',
                border: '2px solid transparent',
                cursor: 'pointer',
              }}
            />
            <div
              style={{
                width: 60,
                height: 100,
                borderRadius: 8,
                background: 'linear-gradient(45deg, #0a0e14, #1a1f2e)',
                border: '2px solid transparent',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#00ff9f', marginBottom: 16 }}>
          Developer
        </h3>
        <div
          style={{
            backgroundColor: '#0f1419',
            border: '1px solid #2d3748',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#2d3748',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Hanif Al</div>
            <div style={{ fontSize: 13, color: '#9ca3af' }}>DevOps Engineer</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Settings" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
