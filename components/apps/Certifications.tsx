'use client';

import { certifications } from '@/data/certs';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function Certifications() {
  const { isMobileOrTablet } = useResponsive();

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Certifications
        </h2>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        {certifications.map((cert, i) => (
          <div
            key={i}
            style={{
              padding: isMobileOrTablet ? 20 : 16,
              backgroundColor: '#0f1419',
              border: '1px solid #2d3748',
              borderRadius: 8,
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <h3 style={{ fontSize: isMobileOrTablet ? 17 : 16, fontWeight: 600, color: '#e6edf3', flex: 1 }}>
                {cert.name}
              </h3>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: cert.status === 'Active' ? '#10b981' : '#6b7280',
                  color: '#0a0e14',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                  marginLeft: 12,
                }}
              >
                {cert.status}
              </span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#bd93f9', fontSize: 13, fontWeight: 600 }}>
                {cert.issuer}
              </span>
              <span style={{ color: '#6b7280', fontSize: 13, marginLeft: 8 }}>
                • {cert.year}
              </span>
            </div>
            <p style={{ color: '#e6edf3', fontSize: isMobileOrTablet ? 14 : 13, lineHeight: 1.5 }}>
              {cert.description}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: '#0f1419',
          border: '1px solid #2d3748',
          borderRadius: 8,
          fontSize: 13,
          color: '#6b7280',
          textAlign: 'center',
        }}
      >
        Verification links available upon request
      </div>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Certifications" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
