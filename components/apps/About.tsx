'use client';

import { profile } from '@/data/profile';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function About() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        {!isMobileOrTablet && (
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 16 }}>
            About Me
          </h2>
        )}
        <div style={{ display: 'flex', gap: 24, alignItems: 'start', flexDirection: isMobileOrTablet ? 'column' : 'row' }}>
          <div
            style={{
              width: isMobileOrTablet ? '100%' : 120,
              height: 120,
              backgroundColor: '#2d3748',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              flexShrink: 0,
            }}
          >
            👤
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: isMobileOrTablet ? 22 : 20, fontWeight: 600, color: '#e6edf3', marginBottom: 8 }}>
              {profile.name}
            </h3>
            <p style={{ color: '#bd93f9', fontSize: isMobileOrTablet ? 15 : 14, marginBottom: 12 }}>
              {profile.title}
            </p>
            <p style={{ color: '#e6edf3', lineHeight: 1.6, fontSize: isMobileOrTablet ? 15 : 14 }}>
              {profile.bio}
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: isMobileOrTablet ? 18 : 16, fontWeight: 600, color: '#00ff9f', marginBottom: 12 }}>
          Specializations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
          {profile.specializations.map((spec, i) => (
            <div
              key={i}
              style={{
                padding: isMobileOrTablet ? '10px 14px' : '8px 12px',
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 4,
                fontSize: isMobileOrTablet ? 14 : 13,
                color: '#e6edf3',
              }}
            >
              • {spec}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: isMobileOrTablet ? 18 : 16, fontWeight: 600, color: '#00ff9f', marginBottom: 12 }}>
          Current Focus
        </h3>
        <p style={{ color: '#e6edf3', lineHeight: 1.6, fontSize: isMobileOrTablet ? 15 : 14 }}>
          {profile.currentFocus}
        </p>
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="About" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
