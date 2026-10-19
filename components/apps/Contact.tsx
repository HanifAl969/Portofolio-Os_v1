'use client';

import { profile } from '@/data/profile';
import { useResponsive } from '@/hooks/useResponsive';
import MobileAppView from '../mobile/MobileAppView';

export default function Contact() {
  const { isMobileOrTablet } = useResponsive();

  const contacts = [
    { label: 'Email', value: profile.contact.email, icon: '📧', link: `mailto:${profile.contact.email}` },
    { label: 'GitHub', value: profile.contact.github.replace('https://', ''), icon: '🐙', link: profile.contact.github },
    { label: 'LinkedIn', value: profile.contact.linkedin.replace('https://', ''), icon: '💼', link: profile.contact.linkedin },
    { label: 'Twitter', value: profile.contact.twitter.replace('https://', ''), icon: '🐦', link: profile.contact.twitter },
  ];

  const content = (
    <div style={{ fontFamily: 'sans-serif' }}>
      {!isMobileOrTablet && (
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#00ff9f', marginBottom: 20 }}>
          Contact Information
        </h2>
      )}

      <div style={{ marginBottom: 24 }}>
        <p style={{ color: '#e6edf3', fontSize: isMobileOrTablet ? 16 : 14, lineHeight: 1.6, marginBottom: 24 }}>
          Feel free to reach out for collaboration, consulting, or just to connect.
          I'm always interested in discussing DevOps, infrastructure, and security topics.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {contacts.map((contact, i) => (
            <a
              key={i}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: isMobileOrTablet ? 20 : 16,
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: isMobileOrTablet ? 36 : 32 }}>{contact.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#bd93f9', fontWeight: 600, marginBottom: 4 }}>
                  {contact.label}
                </div>
                <div style={{ fontSize: isMobileOrTablet ? 16 : 14, color: '#e6edf3' }}>
                  {contact.value}
                </div>
              </div>
              <div style={{ fontSize: 20, color: '#6b7280' }}>→</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: isMobileOrTablet ? 18 : 16, fontWeight: 600, color: '#00ff9f', marginBottom: 12 }}>
          Available For
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
          {['DevOps Consulting', 'Infrastructure Architecture', 'Security Audits', 'Contract Work'].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '12px 14px',
                backgroundColor: '#0f1419',
                border: '1px solid #2d3748',
                borderRadius: 4,
                fontSize: 14,
                color: '#e6edf3',
                textAlign: 'center',
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>

      <button
        style={{
          marginTop: 32,
          width: '100%',
          padding: 16,
          backgroundColor: '#00ff9f',
          color: '#0a0e14',
          border: 'none',
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Download CV / Resume
      </button>
    </div>
  );

  if (isMobileOrTablet) {
    return (
      <MobileAppView title="Contact" showBack={false}>
        {content}
      </MobileAppView>
    );
  }

  return content;
}
